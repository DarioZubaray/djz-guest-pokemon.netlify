import getPokemonOptions, { getPokemons, getPokemonsName } from "@/helpers/getPokemonOptions"
import { mockPokemons } from '../mocks/pokemons.mock'


describe('getPokemonOptions helpers', () => {

    test('getPokemons: debe de regresar un arreglo de numero', () => {
        
        const pokemons = getPokemons()

        expect( pokemons.length ).toBe(650)
        expect( pokemons[0] ).toBe(1)
        expect( pokemons[500] ).toBe(501)
        expect( pokemons[649] ).toBe(650)
    })

    test('getPokemonsName: debe de retornar un arrelgo de X elementos con los nombres', async () => {

        const pokemons = await getPokemonsName([1, 2, 3, 4])

        expect( pokemons ).toStrictEqual( mockPokemons )
    })

    test('getPokemonOptions: debe de retornar un arreglo mezclado', async () => {
      
        const dificulty = 4
        const pokemons = await getPokemonOptions(4)

        expect (pokemons.length ).toBe(dificulty)
        expect (pokemons ).toEqual([
            { name: expect.any(String), id: expect.any(Number) },
            { name: expect.any(String), id: expect.any(Number) },
            { name: expect.any(String), id: expect.any(Number) },
            { name: expect.any(String), id: expect.any(Number) }
        ])
    })

})