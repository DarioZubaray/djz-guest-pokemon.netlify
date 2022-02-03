import { shallowMount } from '@vue/test-utils'
import PokemonImage from '@/components/PokemonImage'

describe('PokemonImage component', () => {

    test('debe de hacer match con el snapshot', () => {
      const wrapper = shallowMount( PokemonImage, {
          props: {
              pokemonId: 1,
              showPokemon: false
          }
      })

      expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Debe de mostar la imagen oscurecida y el pokemon numero 100', () => {
        const wrapper = shallowMount( PokemonImage, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        })

        const [ img1, img2 ] = wrapper.findAll('img')

        expect( img1.exists() ).toBeTruthy()
        expect( img1.classes('hidden-pokemon') ).toBeTruthy()
        expect( img1.attributes('src') ).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
        expect( img2 ).toBe(undefined)
    })

    test('Debe de mostrar el pokemon si showPokemon es true', () => {
        const wrapper = shallowMount( PokemonImage, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })

        const img = wrapper.find('img')

        expect( img.exists() ).toBeTruthy()
        expect( img.classes('fade-in') ).toBeTruthy()
    })
})