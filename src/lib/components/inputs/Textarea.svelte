<script lang="ts">
  interface $$Props extends Partial<HTMLInputElement> {
    label?: string;
    rows?: string;
  }

  export let label: string | undefined = undefined;
</script>

<div class="text-start">
  {#if label}
    <label for={$$props.name} class="mb-2 block text-lg font-medium leading-6"
      >{label}</label
    >
  {/if}
  <textarea
    id={$$props.name}
    rows={$$props.rows}
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
    {...$$restProps}
  />
</div>
