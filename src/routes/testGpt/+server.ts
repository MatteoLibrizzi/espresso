import ConversationHandler from "../../services/conversationHandler";

export async function GET() {
    const ch = new ConversationHandler(import.meta.env.VITE_OPENAI_KEY);
    const res = await ch.nextQuery(
        "I want to see a 3x3 matrix with numbers from 1 to 9, then I want to see that matrix multiplied by itself transposed"
    );
    const res2 = await ch.nextQuery("now 4x4");
    const conv = ch.getConversationHistory();
    return new Response(JSON.stringify(conv) as any, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
