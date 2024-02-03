<script>
  import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
  import Textarea from "$lib/components/inputs/Textarea.svelte";
</script>

<div class="bg-white">
  <div class="mx-auto max-w-2xl py-16 px-6 sm:py-80 lg:px-8">
    <form action="" class="text-center flex flex-col space-y-2">
      <Textarea name="prompt" label="describe your next animation ✨" />
      <div class="text-end">
        <PrimaryButton>generate</PrimaryButton>
      </div>
    </form>
  </div>
</div>
