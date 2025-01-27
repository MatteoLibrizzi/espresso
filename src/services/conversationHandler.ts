import GPTInterface, { type Interaction } from "./gptInterface";

function filterConv(conversation: Interaction[]): Interaction[] {
  const filtered = conversation.filter((msg) => msg.role != "videoPath");
  return filtered;
}

class ConversationHandler {
  private gptInterface: GPTInterface;
  public conversation: Interaction[] = [];
  private systemPrompt = `Your are a manim expert, use only methods that you can find in manim documentation. 
    You receive a prompt and write code step by step that do all the animations requested.
    You always create a python class with the name Anima.
    Remember that ShowCreation is not defined.
    You answer with only code and nothing else. Use single quotes for strings.`;

  constructor(apiKey: string) {
    this.gptInterface = new GPTInterface(apiKey);
    this.conversation = [{ role: "system", content: this.systemPrompt }];
  }

  async nextQuery(prompt: string, codeBlock?: string): Promise<string> {
    if (codeBlock && !codeBlock.includes("prompt to generate")) {
      prompt = `${codeBlock}\n@@@@@\n${prompt}`;
    }
    this.conversation.push({ role: "user", content: prompt });
    try {
      const response = await this.gptInterface.getResponse(
        filterConv(this.conversation),
      );
      response.content = response.content
        .replace(/`/g, "")
        .replace(/\bpython\b/gi, "");
      this.conversation.push(response);
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
