import { SESSION } from "../../services/storage";

export async function POST(req) {
  const body = await req.request.json();
  const prompt = body.prompt;
  const codeBlock = body.code;
  try {
    const { conversation } = await SESSION.nextVideo(prompt!, codeBlock ?? "");
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
