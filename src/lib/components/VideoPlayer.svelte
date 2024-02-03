<script>
	export let videoSource = ''
</script>

<main>
	<video id="video" controls>
		<source src={videoSource} type="video/mp4" />
		<track kind="captions" />
	</video>
</main>
