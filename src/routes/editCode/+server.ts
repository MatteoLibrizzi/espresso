import { SESSION } from "../../services/storage";

export async function POST(req) {
    const body = await req.request.json();
    const codeBlock = body.code;
    if (codeBlock == "# Start writing a prompt to generate code.") {
        return new Response(
            JSON.stringify({
                conversation: null,
                noChange: true,
            }) as string,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
    try {
        const res = await SESSION.editCode(codeBlock);
        if (res == null) {
            return new Response(
                JSON.stringify({
                    conversation: null,
                    noChange: true,
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
                noChange: false,
            }) as string,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (e) {
        console.error(e);
        return new Response("Impossible to compile the code", {
            status: 500,
        });
    }
}
