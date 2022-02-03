import { shallowMount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { mockPokemons } from '../mocks/pokemons.mock'

describe('PokemonPage', () => {

    let wrapper

    beforeEach( () => {
        wrapper = shallowMount( PokemonPage )
    })

    test('debe de hacer match con el snapshot', () => {
      expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de llamar el mixPokemonArray al montar', () => {
        const mixPokemonArraySPy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        wrapper = shallowMount( PokemonPage )

        expect( mixPokemonArraySPy ).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando se cargan los pokemons', () => {
        wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: mockPokemons,
                    choosed: mockPokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    isCorrect: false,
                    message: '',
                    aditionalMessage: '',
                    revealCorrect: false,
                    score: 0,
                    selected: 4,
                    dificulty: 4
                }
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de pokemon-image y pokemon-options', () => {
      const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: mockPokemons,
                    choosed: mockPokemons[3],
                    showPokemon: false,
                    showAnswer: false,
                    isCorrect: false,
                    message: '',
                    aditionalMessage: '',
                    revealCorrect: false,
                    score: 0,
                    selected: 4,
                    dificulty: 4
                }
            }
        })

        
        const pokemonImage = wrapper.find('pokemon-image-stub')
        const pokemonOptions = wrapper.find('pokemon-options-stub')
        expect( pokemonImage.exists() ).toBeTruthy()
        expect( pokemonOptions.exists() ).toBeTruthy()

        expect( pokemonImage.attributes('pokemonid') ).toBe('4')
        expect( pokemonOptions.attributes('pokemons') ).toBeTruthy()
    })

    test('pruebas con checkAnswer', async() => {
        
        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: mockPokemons,
                    choosed: mockPokemons[2],
                    showPokemon: false,
                    showAnswer: false,
                    isCorrect: false,
                    message: '',
                    aditionalMessage: '',
                    revealCorrect: false,
                    score: 0,
                    selected: 4,
                    dificulty: 4
                }
            }
        })

        await wrapper.vm.checkAnswer(mockPokemons[2])

        expect( wrapper.find('h2').exists() ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBe(true)
        expect( wrapper.find('h2').text() ).toBe(`Correcto! Es ${ mockPokemons[2].name }.`)

        await wrapper.vm.checkAnswer(mockPokemons[0])

        expect( wrapper.vm.message ).toBe(`Oops! No era ${ mockPokemons[0].name }.`)

    })
})