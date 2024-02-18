import { writable } from "svelte/store";

export const editorContent = writable(
  "# Start writing a prompt to generate code.",
);
