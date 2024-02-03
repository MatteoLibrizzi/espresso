import UserFlowHandler from "../../services/userFlowHandler";

export async function GET() {
    const conv = new UserFlowHandler();
    console.log(await conv.nextVideo("Generate a square"));
    console.log(await conv.nextVideo("Make it yellow"));

    return new Response(JSON.stringify(conv) as any, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
