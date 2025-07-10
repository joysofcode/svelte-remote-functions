<script lang="ts">
	import { Star } from 'lucide-svelte'
	import { getPokemon, getPokemonDetails, likePokemon } from './pokemon.remote'

	let pokemonList = getPokemon()
	let details = $state(await getPokemonDetails())
	let selected = $state('bulbasaur')
</script>

<div class="flex h-[80vh] w-[90vw] rounded-lg text-left">
	<ul
		class="flex list-none flex-col gap-8 overflow-hidden overflow-y-auto px-8 py-4 text-6xl scrollbar"
	>
		{#each await pokemonList as pokemon}
			{@const active = pokemon.name === selected}
			<li class="flex gap-16 items-center justify-between">
				<button
					onclick={async () => {
						details = await getPokemonDetails(pokemon.url)
						selected = pokemon.name
					}}
				>
					<span class={['capitalize transition-colors duration-300', active && 'text-[aqua]']}>
						{pokemon.name}
					</span>
				</button>

				<form
					{...likePokemon.enhance(async ({ data, submit }) => {
						const name = data.get('pokemon') as string
						await submit().updates(
							getPokemon().withOverride((pokemon) =>
								pokemon.map((p) => (p.name === name ? { ...p, favorite: true } : p))
							)
						)
					})}
				>
					<input type="hidden" name="pokemon" value={pokemon.name} />
					<button class="grid place-content-center">
						{#if pokemon.favorite}
							<Star size={40} color="yellow" fill="yellow" />
						{:else}
							<Star size={40} color="white" fill="none" />
						{/if}
					</button>
				</form>
			</li>
		{/each}
	</ul>

	<div class="mx-auto content-center">
		<img class="pixelated block aspect-square w-[600px]" src={details.image} alt={details.name} />
	</div>
</div>
