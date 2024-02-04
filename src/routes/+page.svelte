<script lang="ts">
  import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
  import InteractionTile from "$lib/components/layout/InteractionTile.svelte";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import type { Interaction } from "../services/gptInterface";

  $: conversation = [] as Interaction[];

  let newPrompt = "";
  let div: HTMLDivElement;

  const submitPrompt = async () => {
    console.log("submitting prompt", newPrompt);
    const response = await fetch("/testVideoFlow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: newPrompt }),
    });

    const data = await response.json();

    conversation = [...data.conversation];
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
    <ul role="list" class="-mb-8">
      {#each conversation as interaction, index}
        <InteractionTile
          role={interaction.role}
          sender="You"
          avatar="https://media.licdn.com/dms/image/C4E03AQH7IG289IiyLA/profile-displayphoto-shrink_400_400/0/1658559390930?e=1712793600&v=beta&t=99ydzLr1bZrNhZfdxEveDGTftvCm0Aw51KQ_u54Dnpg"
        >
          {interaction.content}
        </InteractionTile>
      {/each}
    </ul>
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
