import { SESSION } from '../../services/storage'
import UserFlowHandler from '../../services/userFlowHandler'

const conv = new UserFlowHandler()

export async function GET(req) {
	const prompt = req.url.searchParams.get('query')
	await conv.nextVideo(prompt!, '')

	return new Response(JSON.stringify(conv) as any, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export async function POST(req) {
	const body = await req.request.json()
	const prompt = body.prompt
	const codeBlock = body.code

	console.log(await conv.nextVideo(prompt!, codeBlock ?? ''))

	const conversation = SESSION.getCompleteConversation()

	return new Response(JSON.stringify({ conversation }) as string, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
