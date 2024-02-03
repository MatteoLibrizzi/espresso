import { SESSION } from '../../services/storage'

export async function POST(req) {
	const body = await req.request.json()
	const prompt = body.prompt
	const codeBlock = body.code

	console.log(await SESSION.nextVideo(prompt!, codeBlock ?? ''))

	const conversation = SESSION.getCompleteConversation()

	return new Response(JSON.stringify({ conversation }) as string, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
