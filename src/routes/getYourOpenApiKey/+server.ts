export function GET() {
	return new Response(import.meta.env.VITE_OPENAI_KEY, {
		headers: {
			'content-type': 'text/plain',
		},
	})
}
