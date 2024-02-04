<script lang="ts">
    import MonacoEditor from "../lib/components/monacoEditor.svelte";

    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import type { Interaction } from "../services/gptInterface";
    import { Toaster, toast } from "svelte-french-toast";
    import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
    import InteractionTile from "$lib/components/layout/InteractionTile.svelte";
    import VideoAndCodeContainer from "$lib/components/VideoAndCodeContainer.svelte";

    $: conversation = [] as Interaction[];

    let newPrompt = "";
    let newCode = "";
    let div: HTMLDivElement;

    const submitPrompt = async () => {
        console.log("submitting prompt", newPrompt);

        if (newPrompt === "") return;

        const response = await fetch("/testVideoFlow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: newPrompt, code: newCode }),
        });

        if (!response.ok) {
            toast.error("An error occurred while submitting the prompt.");
        }
        const data = await response.json();

        conversation = [...data.conversation];
        newPrompt = "";

        newCode = conversation[-1].content;

        changeEditorContent();
    };

    import { editorContent } from "../lib/shared/stores/editorContent";

    const changeEditorContent = () => {
        editorContent.set(newCode);
    };

    const editCode = async () => {
        console.log("editingCode prompt", newPrompt);
        const response = await fetch("/editCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: newCode }),
        });
        if (!response.ok) {
            toast.error("An error occurred while comiling the code.");
        }

        const data = await response.json();
        if (data.noChange) {
            toast.error("No change in code");
        }
        conversation = [...data.conversation];
        newPrompt = "";
    };
</script>

<svelte:head>
    <title>Espresso</title>
</svelte:head>

<div class="bg-gray-50 flex flex-col items-center h-screen" bind:this={div}>
    <div class="w-1/2">
        <div
            id="chat-container"
            class="max-h-400 overflow-y-auto w-full mx-auto max-w-3xl mt-auto no-scrollbar pt-12"
        >
            <ul role="list" class="-mb-8">
                {#each conversation as interaction, index}
                    <InteractionTile
                        role={interaction.role}
                        sender="You"
                        avatar="https://media.licdn.com/dms/image/C4E03AQH7IG289IiyLA/profile-displayphoto-shrink_400_400/0/1658559390930?e=1712793600&v=beta&t=99ydzLr1bZrNhZfdxEveDGTftvCm0Aw51KQ_u54Dnpg"
                    >
                        {#if interaction.role === "assistant"}
                            <VideoAndCodeContainer
                                videoSource={interaction.videoPath}
                                code={interaction.content}
                            />
                        {:else}
                            {interaction.content}
                        {/if}
                    </InteractionTile>
                {/each}
            </ul>
        </div>

        <div
            class="flex flex-row gap-4 p-2 max-w-3xl w-full items-center justify-center space-x-2 border rounded-md mb-6 sticky bottom-0 bg-gray-50 border-t"
        >
            <input
                on:keydown={submitPrompt}
                class="flex-grow p-2 rounded-md bg-gray-50 ring-0 border-0 focus:outline-none"
                bind:value={newPrompt}
                placeholder="Make an animation that shows how an integral is computed for a cubic function..."
            />
            <PrimaryButton on:click={submitPrompt}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-up"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                    />
                </svg>
            </PrimaryButton>
        </div>
    </div>
    <div class="w-1/2">
        <MonacoEditor />
    </div>
</div>
