<script>
	export let videoSource = ''
</script>

<main class="w-96">
	<video id="video" controls>
		<source src={videoSource} type="video/mp4" />
		<track kind="captions" />
	</video>
</main>
