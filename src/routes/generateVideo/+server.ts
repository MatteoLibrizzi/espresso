import { SESSION } from "../../services/storage";

export async function POST(req: any) {
  const body = await req.request.json();
  const prompt = body.prompt;
  const codeBlock = body.code;
  try {
    const { conversation } = await SESSION.nextVideo(prompt!, codeBlock ?? "");
    if (conversation[conversation.length - 1].role === "videoPath") {
      throw new Error("Video not generated");
    }
    return new Response(JSON.stringify({ conversation }) as string, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return new Response("Impossible to generate the video", {
      status: 500,
    });
  }
}
