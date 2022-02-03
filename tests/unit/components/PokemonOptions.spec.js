import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'
import { mockPokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions components', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount( PokemonOptions, {
            props: {
              disabledButtons: false,
              pokemons: mockPokemons
            }
        })
    })

    test('debe de hacer match con el snapshot', () => {
      expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de mostrar las opciones correctas', () => {

        const [ li1, li2, li3, li4] = wrapper.findAll('li')

        expect( li1.exists() ).toBeTruthy()
        expect( li1.text() ).toBe(mockPokemons[0].name.toUpperCase())
        expect( li2.exists() ).toBeTruthy()
        expect( li2.text() ).toBe(mockPokemons[1].name.toUpperCase())
        expect( li3.exists() ).toBeTruthy()
        expect( li3.text() ).toBe(mockPokemons[2].name.toUpperCase())
        expect( li4.exists() ).toBeTruthy()
        expect( li4.text() ).toBe(mockPokemons[3].name.toUpperCase())
    })

    test('debe de emitir "selection" con sus respectivos parametros al hacer click', () => {
        const pokemonEmitted = {
            "id": 1,
            "name": "bulbasaur",
        }
        const [ li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')

        expect ( wrapper.emitted('selection').length ).toBe(1)
        expect ( wrapper.emitted('selection')[0] ).toEqual([pokemonEmitted])
    })

})