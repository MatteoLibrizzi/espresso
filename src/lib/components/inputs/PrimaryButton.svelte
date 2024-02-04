<script lang="ts">
  type $$Props = Partial<HTMLButtonElement>;
</script>

<button
  {...$$restProps}
  on:click
  class="text-2xl rounded-md bg-indigo-500 font-semibold text-white shadow-sm hover:bg-indigo-600 px-4 py-4"
>
  <slot />
</button>
