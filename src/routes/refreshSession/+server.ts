import { resetSession } from "../../services/storage";

export async function GET(req: any) {
  resetSession();
  return new Response(null, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
