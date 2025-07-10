import type { Pokemon, PokemonDetails } from '$lib/types'

async function getPokemon() {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon')
	if (!response.ok) throw Error('💣️ Failed to fetch Pokemon')
	return (await response.json()).results as Pokemon[]
}

async function getPokemonDetails(pokemonUrl) {
	const response = await fetch(pokemonUrl || 'https://pokeapi.co/api/v2/pokemon/1')
	if (!response.ok) throw Error('💣️ Failed to fetch Pokemon details')
	const pokemon = (await response.json()) as PokemonDetails
	return {
		name: pokemon.name,
		image: pokemon.sprites.front_default
	}
}

export const api = { getPokemon, getPokemonDetails }
