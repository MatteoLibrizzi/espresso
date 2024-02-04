<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

    let editor: Monaco.editor.IStandaloneCodeEditor;
    let monaco: typeof Monaco;
    let editorContainer: HTMLElement;

    export let content: string;

    async function mountEditor() {
        console.log("mounting editor");
        monaco = (await import("./monaco")).default;
        editor = monaco.editor.create(editorContainer, { readOnly: true });
        const model = monaco.editor.createModel(content, "python");
        editor.setModel(model);
        monaco.editor.setTheme("vs-dark");
        model.setValue(content);
    }

    onMount(async () => {
        await mountEditor();
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });
</script>

<div>
    <div class="h-screen w-full h-full" />
</div>
