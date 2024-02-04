import ConversationHandler from "./conversationHandler";
import type { Interaction } from "./gptInterface";
import { video_render } from "./utilities";

function getFixPrompt(prompt: string, error: string) {
    return `The returned code for "${prompt} returned compile error ${error}, fix it`;
}

function isCodeDiff(code: string, conversation: any) {
    if (code === "" || code == null) {
        return false;
    }
    if (conversation.length < 2) {
        return false;
    }
    if (code !== conversation[conversation.length - 2].content) {
        console.log("Code is different");
        return true;
    }
    return false;
}

function cleanConversation(conversation: Interaction[]): Interaction[] {
    let cleanedConversation: Interaction[] = [];
    for (let i = 0; i < conversation.length; i++) {
        if (
            conversation[i].role === "assistant" &&
            i < conversation.length - 1 &&
            conversation[i + 1].role === "videoPath"
        ) {
            cleanedConversation.push({
                role: "assitant",
                content: `${conversation[i].content}`,
                videoPath: conversation[i + 1].content,
            });
            i++; // Skip next interaction
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
        return {
            conversation: cleanConversation(this.getCompleteConversation()),
        };
    }

    async editCode(codeBlock: string) {
        if (
            !isCodeDiff(codeBlock, this.conversation.getConversationHistory())
        ) {
            return null;
        }

        const videoPath = await video_render(codeBlock);
        this.getCompleteConversation().push({
            role: "user",
            content: codeBlock,
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
