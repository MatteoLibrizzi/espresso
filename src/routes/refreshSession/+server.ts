import { resetSession } from "../../services/storage";

export async function GET(req) {
    resetSession();
    return new Response(null, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
