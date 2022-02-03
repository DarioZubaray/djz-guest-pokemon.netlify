import pokemonApi from '@/api/pokemonApi'

describe('PokemonApi', () => {

    test('axios debe de estar configurado con la baseUrl', () => {
      
        expect( pokemonApi.defaults.baseURL ).toBe('https://pokeapi.co/api/v2/pokemon')
    })

})