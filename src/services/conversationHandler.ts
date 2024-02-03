import GPTInterface, { type Interaction } from "./gptInterface";

class ConversationHandler {
    private gptInterface: GPTInterface;
    private conversation: Interaction[] = [];
    private systemPrompt = `Your are a manim expert, use only methods that you can find in manim documentation. 
    You receive a prompt and write code step by step that do all the animations requested.
    You always create a python class with the name Anima, and use manim in the right way.
    You answer with only code and nothing else, do not put backtics. `;

    constructor(apiKey: string) {
        this.gptInterface = new GPTInterface(apiKey);
        this.conversation = [{ role: "system", content: this.systemPrompt }];
    }

    async nextQuery(prompt: string, codeBlock?: string): Promise<string> {
        // const fullPrompt = codeBlock ? `${codeBlock}\n${prompt}` : prompt;
        this.conversation.push({ role: "user", content: prompt });
        try {
            const response = await this.gptInterface.getResponse(
                this.conversation
            );
            this.conversation.push(response);
            console.log(`Generated code:\n ${response.content}`);
            return response.content;
        } catch (error) {
            console.error("Error making call to GPT:", error);
            throw error;
        }
    }

    async makeCall(prompt: string, codeBlock?: string): Promise<string> {
        const messages = [{ role: "user", content: prompt }];
        try {
            const response = await this.gptInterface.getResponse(messages);
            return response.content;
        } catch (error) {
            console.error("Error making call to GPT:", error);
            throw error;
        }
    }

    getConversationHistory(): Interaction[] {
        return this.conversation;
    }
}

export default ConversationHandler;
