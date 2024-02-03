<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import PrimaryButton from "$lib/components/inputs/PrimaryButton.svelte";
  import Textarea from "$lib/components/inputs/Textarea.svelte";
  import toast from "svelte-french-toast";
  import type { SubmitFunction } from "@sveltejs/kit";

  const onSubmit: SubmitFunction = () => {
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          toast.success("Done!");
          await update();
          break;
        case "error":
          toast.error(result.error.message);
          break;
        case "failure":
          toast.error(result.data?.errors.join("\n") ?? [].join("\n"));
          break;
        default:
          await applyAction(result);
          break;
      }
    };
  };
</script>

<svelte:head>
  <title>Espresso</title>
</svelte:head>

<div class="bg-white">
  <div class="mx-auto max-w-2xl py-16 px-6 sm:py-80 lg:px-8">
    <form
      method="POST"
      use:enhance={onSubmit}
      class="text-center flex flex-col space-y-2"
    >
      <Textarea
        name="prompt"
        label="describe your next animation ✨"
        rows="8"
        placeholder="I want to see a 3x3 matrix with numbers from 1 to 9, then I want to see that matrix multiplied by itself transposed"
      />
      <div class="text-end">
        <PrimaryButton>generate</PrimaryButton>
      </div>
    </form>
  </div>
</div>
