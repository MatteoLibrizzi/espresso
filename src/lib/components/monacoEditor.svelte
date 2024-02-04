<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { editorContent } from "../shared/stores/editorContent";
    import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

    let editor: Monaco.editor.IStandaloneCodeEditor;
    let monaco: typeof Monaco;
    let editorContainer: HTMLElement;

    let content: string;
    editorContent.subscribe((value) => {
        content = value;
        if (editor) {
            const model = editor.getModel();
            model.setValue(content);
        }
    });

    onMount(async () => {
        monaco = (await import("./monaco")).default;
        editor = monaco.editor.create(editorContainer);
        const model = monaco.editor.createModel(content, "javascript");
        editor.setModel(model);
        monaco.editor.setTheme("vs-dark");
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });
</script>

<div>
    <div class="container" bind:this={editorContainer} />
</div>

<style>
    .container {
        width: 95%;
        height: 90vh;
        margin-top: 5vh;
        margin-bottom: 5vh;
    }
</style>
