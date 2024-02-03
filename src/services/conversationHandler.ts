import GPTInterface from "./gptInterface";

interface Conversation {
    prompt: string;
    response: string;
}

class ConversationHandler {
    private gptInterface: GPTInterface;
    private conversations: Conversation[] = [];

    constructor(apiKey: string) {
        this.gptInterface = new GPTInterface(apiKey);
    }

    async makeCall(prompt: string, codeBlock?: string): Promise<string> {
        const fullPrompt = codeBlock ? `${codeBlock}\n${prompt}` : prompt;

        try {
            const response = await this.gptInterface.getResponse(fullPrompt);
            this.conversations.push({ prompt: fullPrompt, response });
            return response;
        } catch (error) {
            console.error("Error making call to GPT:", error);
            throw error;
        }
    }

    getConversationHistory(): Conversation[] {
        return this.conversations;
    }
}

export default ConversationHandler;
