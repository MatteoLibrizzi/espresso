<script lang="ts">
    import MonacoEditor from "../lib/components/monacoEditor.svelte";

    import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
    import InteractionTile from "$lib/components/layout/InteractionTile.svelte";
    import VideoAndCodeContainer from "$lib/components/VideoAndCodeContainer.svelte";
    import { afterUpdate, beforeUpdate } from "svelte";
    import type { Interaction } from "../services/gptInterface";
    import { toast } from "svelte-french-toast";
    import { proModeStorage } from "$lib/shared/stores/proMode";
    import Toggle from "$lib/components/Toggle.svelte";

    $: conversation = [] as Interaction[];
    $: proMode = false;

    proModeStorage.subscribe((value: boolean) => {
        proMode = value;
    });

    const onChangeProp = (value: boolean) => {
        proMode = value;
        proModeStorage.set(value);
    };

    let newPrompt = "";
    let newCode = "";
    let ul: HTMLUListElement;
    let autoscroll = false;

    beforeUpdate(() => {
        if (ul) {
            const isScrolledToBottom =
                ul.scrollHeight - ul.clientHeight <= ul.scrollTop + 1;
            autoscroll = isScrolledToBottom;
        }
    });

    afterUpdate(() => {
        if (autoscroll) {
            ul.scrollTop = ul.scrollHeight;
        }
    });

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
        newCode = conversation[conversation.length - 1].content;
        console.log("newCode", newCode);
        changeEditorContent();
    };

    import { editorContent } from "../lib/shared/stores/editorContent";

    const changeEditorContent = () => {
        editorContent.set(newCode);
    };

    const editCode = async () => {
        console.log("editingCode prompt", newCode);
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

    editorContent.subscribe(async (value) => {
        newCode = value;
    });
</script>

<svelte:head>
    <title>Espresso</title>
</svelte:head>

<div class="bg-gray-50 flex flex-col items-center h-screen">
    <div class={proMode ? "flex flex-row h-screen" : ""}>
        <div class="flex flex-row gap-3 p-5 text-align w-full justify-end">
            <p class="text-sm">Pro Mode</p>
            <Toggle enabled={proMode} onChangeProps={onChangeProp} />
        </div>

        <ul
            class="flex flex-col -mb-8 max-h-400 overflow-y-auto w-full mx-auto max-w-3xl mt-auto no-scrollbar pt-12 scroll-smooth"
            bind:this={ul}
        >
            {#each conversation as interaction, index}
                <InteractionTile
                    role={interaction.role}
                    sender={interaction.role === "assistant"
                        ? "Espresso"
                        : "You"}
                    avatar={interaction.role === "assistant"
                        ? "https://emojiguide.com/wp-content/uploads/platform/apple/42953.png"
                        : "https://media.licdn.com/dms/image/C4E03AQH7IG289IiyLA/profile-displayphoto-shrink_400_400/0/1658559390930?e=1712793600&v=beta&t=99ydzLr1bZrNhZfdxEveDGTftvCm0Aw51KQ_u54Dnpg"}
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

        {#if proMode}
            <div class="w-1/2">
                <MonacoEditor />
            </div>
        {/if}
    </div>
</div>
