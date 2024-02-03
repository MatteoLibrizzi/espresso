import UserFlowHandler from "../../services/userFlowHandler";

const conv = new UserFlowHandler();

export async function GET(req) {
    const prompt = req.url.searchParams.get("query");
    console.log(await conv.nextVideo(prompt!));

    return new Response(JSON.stringify(conv) as any, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
