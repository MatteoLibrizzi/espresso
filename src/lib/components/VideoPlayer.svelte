<script>
  export let videoSource = "";
</script>

<main class="w-full">
  <video id="video" controls class="rounded-md shadow-inner">
    <source src={videoSource} type="video/mp4" />
    <track kind="captions" />
  </video>
</main>
