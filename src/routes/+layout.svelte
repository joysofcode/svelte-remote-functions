<script lang="ts">
	import '../app.css'

	let { children } = $props()
</script>

<svelte:boundary>
	{#snippet failed(error, reset)}
		<button onclick={reset}>oops! try again</button>
	{/snippet}

	{#snippet pending()}
		<p>loading...</p>
	{/snippet}

	{@render children()}
</svelte:boundary>
