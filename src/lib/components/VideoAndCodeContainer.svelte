<script>
	// @ts-nocheck

	import VideoPlayer from './VideoPlayer.svelte'


	export let videoSource = ''
	export let code = ''

	let showCode = false

	const submitPrompt = () => {
		showCode = !showCode
	}
</script>

<main class="w-96">
	<VideoPlayer {videoSource} />

	<button
		on:click={submitPrompt}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>Show code</button
	>
</main>
