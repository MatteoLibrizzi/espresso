<script lang="ts">
	interface $$Props extends Partial<HTMLInputElement> {
		label?: string;
	}

	export let label: string | undefined = undefined;
	export let value: string | undefined = undefined;
</script>

<div>
	{#if label}
		<label for={$$props.name} class="mb-2 block text-sm font-medium leading-6 text-gray-900"
			>{label}</label
		>
	{/if}
	<input
		id={$$props.name}
		on:change
		bind:value
		class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
		{...$$restProps}
	/>
</div>
