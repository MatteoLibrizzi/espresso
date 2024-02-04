<script lang="ts">
	interface $$Props extends Partial<HTMLButtonElement> {
		label?: string
		enabled?: boolean
		onChangeProps?: (value: boolean) => void
	}

	export let label: string | undefined = undefined
	export let enabled: boolean = false
</script>

<div>
	<button
		id={$$props.name}
		type="button"
		class:bg-blue-600={enabled}
		class:bg-gray-200={!enabled}
		class=" relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
		role="switch"
		on:click={() => {
			console.log('Called change props')
			$$props.onChangeProps(!enabled)
		}}
		aria-checked={enabled}
	>
		<span
			aria-hidden="true"
			class:translate-x-5={enabled}
			class:translate-x-0={!enabled}
			class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
		/>
	</button>
	<input type="hidden" name={$$props.name} bind:value={enabled} />
	{#if label}
		<label
			for={$$props.name}
			class="mb-3.5 block text-sm font-medium leading-6 text-gray-900"
		>
			{label}
		</label>
	{/if}
</div>
