import UserFlowHandler from "../../services/userFlowHandler";

const conv = new UserFlowHandler();

export async function GET(req) {
    const prompt = req.url.searchParams.get("prompt");
    const code = req.url.searchParams.get("code");
    console.log(`${prompt}`);
    console.log(await conv.nextVideo(prompt!, code!));

    return new Response(JSON.stringify(conv) as any, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
