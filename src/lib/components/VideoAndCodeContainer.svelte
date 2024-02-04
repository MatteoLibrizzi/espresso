<script lang="ts">
    import VideoPlayer from "./VideoPlayer.svelte";
    import Modal from "./layout/Modal.svelte";

    export let videoSource = "";
    export let code = "";
    export let proMode = false;
    const content = code;

    let showModal = false;
</script>

<main class="w-full max-w-xl flex flex-row items-start">
    <VideoPlayer {videoSource} />
    {#if !proMode}
        <button
            on:click={() => {
                console.log(showModal);
                showModal = true;
            }}
            class=" text-gray-500 font-bold py-2 px-4 rounded"
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-code-slash"
                viewBox="0 0 16 16"
            >
                <path
                    d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"
                />
            </svg></button
        >
    {/if}
</main>
<Modal bind:showModal>
    <h2 slot="header">Your code</h2>
    <div class="h-100 w-70%">
        <pre>{content}</pre>
    </div>
</Modal>
