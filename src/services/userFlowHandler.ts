import ConversationHandler from "./conversationHandler";
import type { Interaction } from "./gptInterface";
import { video_render } from "./utilities";
import { writeFile, readFile } from "fs/promises";
import { createHash } from "crypto";

function getFixPrompt(prompt: string, error: string) {
  return `The returned code for "${prompt} returned compile error ${error}, fix it`;
}

function isCodeDiff(code: string, conversation: any) {
  if (
    code === "" ||
    code == null ||
    code == "# Start writing a prompt to generate code."
  ) {
    return false;
  }
  if (conversation.length < 1) {
    return false;
  }
  if (code !== conversation[conversation.length - 1].content) {
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
        content: conversation[i].content,
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
      const contentL = conversation[i].content.split("@@@@@");
      let content;
      if (contentL.length > 1) {
        content = contentL[1];
      } else {
        content = contentL[0];
      }
      cleanedConversation.push({
        role: conversation[i].role,
        content: content,
      });
    }
  }
  return cleanedConversation;
}

class UserFlowHandler {
  private conversation;
  constructor() {
    this.conversation = new ConversationHandler(
      import.meta.env.VITE_OPENAI_KEY,
    );
  }

  async nextVideo(prompt: string, codeBlock: string) {
    const fileName = `store/${createHash("sha256")
      .update(prompt + codeBlock)
      .digest("hex")}`;

    try {
      const content = await readFile(fileName);
      this.conversation.conversation = JSON.parse(content.toString());

      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        conversation: cleanConversation(this.getCompleteConversation()),
      };
    } catch (error) {}

    if (!isCodeDiff(codeBlock, this.conversation.getConversationHistory())) {
      codeBlock = "";
    }
    let code = await this.conversation.nextQuery(prompt, codeBlock);
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
        code = await this.conversation.nextQuery(
          getFixPrompt(prompt, (e as Error).message),
        );
      }
    }
    this.getCompleteConversation().push({
      role: "videoPath",
      content: videoPath,
    });

    this.remember(fileName, this.getCompleteConversation());

    const compleConversation = cleanConversation(
      this.getCompleteConversation(),
    );
    return { conversation: compleConversation };
  }

  async remember(fileName: string, compleConversation: Interaction[]) {
    await writeFile(fileName, JSON.stringify(compleConversation));
  }

  async editCode(codeBlock: string) {
    const fileName = `store/${createHash("sha256").update(codeBlock).digest("hex")}`;

    try {
      const content = await readFile(fileName);
      this.conversation.conversation = JSON.parse(content.toString());
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        conversation: cleanConversation(this.getCompleteConversation()),
      };
    } catch (error) {}
    if (!isCodeDiff(codeBlock, this.conversation.getConversationHistory())) {
      return null;
    }

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

    this.remember(fileName, this.getCompleteConversation());
    return {
      conversation: cleanConversation(this.getCompleteConversation()),
    };
  }

  getCompleteConversation() {
    return this.conversation.getConversationHistory();
  }
}

export default UserFlowHandler;
