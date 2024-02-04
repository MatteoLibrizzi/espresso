<script lang="ts">
  import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
  import Textarea from "$lib/components/inputs/Textarea.svelte";

  $: conversationHandler = [] as any[];

  function submitPrompt() {
    conversationHandler = [
      { role: "user", content: "hello" },
      { role: "video_path", content: "https" },
      { role: "user", content: "hello" },
      { role: "video_path", content: "https" },
    ];
  }
</script>

<svelte:head>
  <title>Espresso</title>
</svelte:head>

<div class="bg-white">
  <div class="mx-auto max-w-2xl py-16 px-6 sm:py-80 lg:px-8">
    <Textarea
      name="prompt"
      label="describe your next animation ✨"
      rows="8"
      placeholder="I want to see a 3x3 matrix with numbers from 1 to 9, then I want to see that matrix multiplied by itself transposed"
    />
    <div class="text-end">
      <PrimaryButton on:click={submitPrompt}>generate</PrimaryButton>
    </div>

    {#each conversationHandler as interaction}
      {interaction.role}
      {interaction.content}
      <br />
    {/each}
  </div>
</div>
