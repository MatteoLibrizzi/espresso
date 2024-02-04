import { writable } from "svelte/store";

export const editorContent = writable(
    "console.log('Hello from Monaco! (the editor, not the city...)')"
);
