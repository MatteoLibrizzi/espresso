<script lang="ts">
  type $$Props = Partial<HTMLButtonElement>;
</script>

<button
  {...$$restProps}
  on:click
  class="text-2xl rounded-md bg-gray-50 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-2 ring-indigo-500"
>
  <slot />
</button>
