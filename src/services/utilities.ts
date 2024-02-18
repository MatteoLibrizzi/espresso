import { exec } from 'child_process'
import { v4 as uuidv4 } from 'uuid'
import { writeFile } from 'fs/promises'
import { rejects } from 'assert'

export async function video_render(code: string) {
	let uuid = uuidv4()
	let generate_command = `manim -qm animation.py Anima -o ${uuid}`
	let result = {}

	await writeFile('animation.py', code)
	await execCommand(generate_command)
	await execCommand(
		`mv media/videos/animation/720p30/${uuid}.mp4 src/animas/${uuid}.mp4`
	)

	return `src/animas/${uuid}.mp4`
}

async function execCommand(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(stderr)
				return
			}
			resolve(stdout)
		})
	})
}
