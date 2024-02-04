<script lang="ts">
  import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
  import { afterUpdate, beforeUpdate, onMount } from "svelte";

  $: conversationHandler = [
    { content: "Hello!", role: "user" },
    { content: "Hi there!", role: "video_path" },
    { content: "How can I help you?", role: "user" },
  ];

  let newPrompt = "";
  let div: HTMLDivElement;

  const submitPrompt = () => {
    conversationHandler = [
      ...conversationHandler,
      { content: "Hello!", role: "user" },
      { content: "Hi there!", role: "video_path" },
      { content: "How can I help you?", role: "user" },
    ];
    newPrompt = "";
  };
</script>

<svelte:head>
  <title>Espresso</title>
</svelte:head>

<div
  class="bg-gray-50 flex flex-col items-center justify-between min-h-screen"
  bind:this={div}
>
  <div
    id="chat-container"
    class="max-h-400 overflow-y-auto w-full mx-auto max-w-3xl"
  >
    {#each conversationHandler as interaction, index}
      <div>{interaction.content}</div>
      <br />
    {/each}
  </div>

  <div class="flex flex-row gap-4 p-5 mt-auto max-w-3xl w-full">
    <textarea
      class="flex-grow p-2 border rounded-md"
      bind:value={newPrompt}
      placeholder="I want to see a 3x3 matrix with numbers from 1 to 9, then I want to see that matrix multiplied by itself transposed"
    ></textarea>
    <PrimaryButton on:click={submitPrompt}>✨</PrimaryButton>
  </div>
</div>
