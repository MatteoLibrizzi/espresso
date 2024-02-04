import { SESSION } from "../../services/storage";

export async function POST(req) {
    const body = await req.request.json();
    const codeBlock = body.code;
    try {
        const res = await SESSION.editCode(codeBlock);
        if (res == null) {
            return new Response(
                JSON.stringify({
                    conversation: null,
                    noChanges: true,
                }) as string,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        return new Response(
            JSON.stringify({
                conversation: res.conversation,
                noChanges: false,
            }) as string,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (e) {
        return new Response("Impossible to compile the code", {
            status: 500,
        });
    }
}
