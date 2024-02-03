import ConversationHandler from "./conversationHandler";
import { video_render } from "./utilities";

function getFixPrompt(prompt: string, error: string) {
    return `The returned code for "${prompt} returned compile error ${error}, fix it`;
}

class UserFlowHandler {
    private conversation;
    constructor() {
        this.conversation = new ConversationHandler(
            import.meta.env.VITE_OPENAI_KEY
        );
    }

    async nextVideo(prompt: string) {
        let code = await this.conversation.nextQuery(prompt);
        let videoPath: string | undefined = undefined;
        let retries = 0;
        while (videoPath == null) {
            try {
                videoPath = await video_render(code);
            } catch (e: any) {
                retries += 1;
                if (retries > 3) {
                    throw e;
                }
                code = await this.conversation.nextQuery(
                    getFixPrompt(prompt, (e as Error).message)
                );
            }
        }
        this.getCompleteConversation().push({
            role: "videoPath",
            content: videoPath,
        });
        return { videoPath, conversation: this.getCompleteConversation() };
    }

    getCompleteConversation() {
        return this.conversation.getConversationHistory();
    }
}

export default UserFlowHandler;
