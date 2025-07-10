import { z } from 'zod/v4'
import { form, query } from '$app/server'
import { api } from '$lib/server/api'

let pokemon = await api.getPokemon()

export const getPokemon = query(async () => {
	return pokemon
})

export const getPokemonDetails = query(z.string().optional(), async (pokemonUrl) => {
	return api.getPokemonDetails(pokemonUrl)
})

export const likePokemon = form(async (data: FormData) => {
	const name = data.get('pokemon') as string
	pokemon[pokemon.findIndex((p) => p.name === name)].favorite = true

	// simulate optimistic UI update
	await new Promise((resolve) => setTimeout(resolve, 2000))

	await getPokemon().refresh()
})
