import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  kit: {
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
};
export default config;
