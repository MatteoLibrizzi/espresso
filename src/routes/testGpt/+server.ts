import ConversationHandler from "../../services/conversationHandler";

export function GET() {
    console.log(process.env.OPENAI_KEY);
    const ch = new ConversationHandler();
    const res = ch.makeCall("give me your name");

    return new Response(res as any, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
