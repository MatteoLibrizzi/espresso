<script>
  import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
  import Textarea from "$lib/components/inputs/Textarea.svelte";
</script>

<div class="bg-white">
  <div class="mx-auto max-w-2xl py-16 px-6 sm:py-80 lg:px-8">
    <form action="" class="text-center flex flex-col space-y-2">
      <Textarea
        name="prompt"
        label="describe your next animation ✨"
        rows="8"
        placeholder="I want to see a 3x3 matrix with numbers from 1 to 9, then I want to see that matrix multiplied by itself transposed"
      />
      <div class="text-end">
        <PrimaryButton>generate</PrimaryButton>
      </div>
    </form>
  </div>
</div>
