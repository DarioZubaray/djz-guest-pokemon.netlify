import pokemonApi from '@/api/pokemonApi'

export const getPokemons = () => {
    const pokemonArr = Array.from( Array(650) )

    return pokemonArr.map( (_, index) => index + 1)

}

export const getPokemonsName = async (pokemons = []) => {
    const promises = []
    for (const p of pokemons) {
        promises.push( pokemonApi.get(`/${p}`) )
    }

    const pokemonResponse = await Promise.all(promises)

    const arrayResp = []
    for (const p of pokemonResponse) {
        arrayResp.push( { name: p.data.name, id: p.data.id })
    }
    return arrayResp
}

const getPokemonOptions= async (dificulty = 4) => {
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )

    const pokemons = await getPokemonsName( mixedPokemons.splice(0, dificulty) )

    return pokemons
}

export default getPokemonOptions