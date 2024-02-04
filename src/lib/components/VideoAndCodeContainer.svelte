<script>
// @ts-nocheck

	import VideoPlayer from './VideoPlayer.svelte'

	import { AceEditor } from 'svelte-ace'
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
	{#if showCode}
		<AceEditor
			theme="monokai"
			aria-hidden="false"
			width="100%"
			height="200px"
			mode="python"
			value={code}
			readonly={false}
			class="w-96"
			lineNumbers={false}
		/>
	{/if}
</main>
