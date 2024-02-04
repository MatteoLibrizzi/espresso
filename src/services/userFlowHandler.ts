import ConversationHandler from "./conversationHandler";
import type { Interaction } from "./gptInterface";
import { video_render } from "./utilities";
import { writeFile, readFile } from "fs/promises";
import { createHash } from "crypto";

function getFixPrompt(prompt: string, error: string) {
    return `The returned code for "${prompt} returned compile error ${error}, fix it`;
}

function isCodeDiff(code: string, conversation: any) {
    if (code === "" || code == null) {
        return false;
    }
    if (conversation.length < 1) {
        return false;
    }
    console.log(conversation);
    if (code !== conversation[conversation.length - 1].content) {
        console.log("Code is different");
        return true;
    }
    return false;
}

function cleanConversation(conversation: Interaction[]): Interaction[] {
    let cleanedConversation: Interaction[] = [];
    for (let i = 0; i < conversation.length; i++) {
        if (conversation[i].role === "system") {
            continue;
        }
        if (
            conversation[i].role === "assistant" &&
            i < conversation.length - 1 &&
            conversation[i + 1].role === "videoPath"
        ) {
            cleanedConversation.push({
                role: "assistant",
                content: `${conversation[i].content}`,
                videoPath: conversation[i + 1].content,
            });
            i++; // Skip next interaction
        } else if (
            conversation[i].role === "user" &&
            conversation[i].content.startsWith("The returned code for ")
        ) {
            i++; // Skip this interaction and the next one
        } else if (
            conversation[i].role === "user" &&
            conversation[i].content.startsWith("run code again")
        ) {
            continue;
        } else {
            cleanedConversation.push(conversation[i]);
        }
    }
    return cleanedConversation;
}

class UserFlowHandler {
    private conversation;
    constructor() {
        this.conversation = new ConversationHandler(
            import.meta.env.VITE_OPENAI_KEY
        );
    }

    async nextVideo(prompt: string, codeBlock: string) {
        const fileName = `store/${createHash("sha256").update(prompt).digest("hex")}`;
        console.log(`The filename is: ${fileName}`);
        this.getCompleteConversation().push({
            role: "videoPath",
            content: "a",
        });
        console.log(
            `The prompt is: ${JSON.stringify(this.getCompleteConversation())}`
        );
        return;
        try {
            const content = await readFile(fileName);
            console.log("Returned cached data");
            this.conversation.conversation = JSON.parse(content.toString());
            return {
                conversation: cleanConversation(this.getCompleteConversation()),
            };
        } catch (error) {}

        if (
            !isCodeDiff(codeBlock, this.conversation.getConversationHistory())
        ) {
            codeBlock = "";
        }
        let code = await this.conversation.nextQuery(prompt, codeBlock);
        console.log(`${code}`);
        let videoPath: string | undefined = undefined;
        let retries = 0;
        while (videoPath == null) {
            try {
                videoPath = await video_render(code);
            } catch (e: any) {
                retries += 1;
                if (retries > 3) {
                    throw Error("Failed to generate video");
                }
                console.log("Sto generando il video di nuovo");
                code = await this.conversation.nextQuery(
                    getFixPrompt(prompt, (e as Error).message)
                );
            }
        }
        this.getCompleteConversation().push({
            role: "videoPath",
            content: videoPath,
        });

        this.remember(fileName, this.getCompleteConversation());

        const compleConversation = cleanConversation(
            this.getCompleteConversation()
        );
        return { conversation: compleConversation };
    }

    async remember(fileName: string, compleConversation: Interaction[]) {
        await writeFile(fileName, JSON.stringify(compleConversation));
    }

    async editCode(codeBlock: string) {
        //CALEB cash also here
        if (
            !isCodeDiff(codeBlock, this.conversation.getConversationHistory())
        ) {
            return null;
        }

        console.log("diff code true");
        const videoPath = await video_render(codeBlock);
        this.getCompleteConversation().push({
            role: "user",
            content: "run code again",
        });
        this.getCompleteConversation().push({
            role: "assistant",
            content: codeBlock,
        });
        this.getCompleteConversation().push({
            role: "videoPath",
            content: videoPath,
        });
        return {
            conversation: cleanConversation(this.getCompleteConversation()),
        };
    }

    getCompleteConversation() {
        return this.conversation.getConversationHistory();
    }
}

export default UserFlowHandler;
