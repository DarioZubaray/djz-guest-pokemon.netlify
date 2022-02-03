<template>
    <div id="score">
      <div>
        <span>Dificultad: </span>
        <select v-model="selected">
          <option value="2">Fácil</option>
          <option value="4">Medio</option>
          <option value="6">Dificil</option>
        </select>
      </div>
      <div>
        <small>score: </small> <span>{{score}}</span>
      </div>
    </div>

    <h1>¿Quién es este pokémon?</h1>

    <h1 v-if="!choosed">Espere por favor...</h1>
    <div v-else>
        <pokemon-image
          :pokemon-id="choosed.id"
          :show-pokemon="showPokemon"
        ></pokemon-image>
        <PokemonOptions 
          :pokemons="pokemonArr"
          :disabledButtons="showAnswer"
          @selection="checkAnswer"
        />

        <div v-if="showAnswer" class="fadeIn">
          <h2>{{ message }}</h2>

          <template v-if="!isCorrect">
            <h2 v-if="revealCorrect">{{ aditionalMessage }}</h2>
            <button @click="revealCorrectAnswer">¿Quién era?</button>
          </template>

          <button @click="newGame">
            Siguiente
          </button>
        </div>
    </div>
</template>

<script>
import PokemonImage from "@/components/PokemonImage"
import PokemonOptions from "@/components/PokemonOptions"
import getPokemonOptions from "@/helpers/getPokemonOptions"

export default {
  components: { PokemonImage, PokemonOptions },
  // props: {
  //   dificulty : {
  //       type: Number,
  //       required: false,
  //       default: 6
  //     }
  // },
  data() {
    return {
      pokemonArr: [],
      choosed: null,
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
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions(this.dificulty)
      const randInt = Math.floor( Math.random() * this.dificulty )
      this.choosed = this.pokemonArr[ randInt ]
    },
    checkAnswer(pokemon) {
      console.log('checkAnswer', pokemon);
      this.showPokemon = true
      this.showAnswer = true
      this.isCorrect = (pokemon.id === this.choosed.id)
      if ( this.isCorrect ) this.setCorrect()
      else this.setIncorrect(pokemon.name)
    },
    setCorrect() {
      this.message = `Correcto! Es ${this.choosed.name}.`
      this.aditionalMessage = '' 
      this.score = this.score + 1 
    },
    setIncorrect(name) {
      this.message = `Oops! No era ${name}.`
      this.aditionalMessage = `Era ${this.choosed.name}.`
    },
    revealCorrectAnswer() {
      this.revealCorrect = true
    },
    newGame() {
      this.choosed =  null,
      this.showPokemon = false,
      this.showAnswer = false,
      this.isCorrect = false,
      this.message = ''
      this.aditionalMessage = ''
      this.mixPokemonArray()
    }
  },
  watch: {
    selected(value, oldValue) {
      this.dificulty = value
      this.score = 0
      this.newGame()
    }
  },
  mounted() {
    this.mixPokemonArray()
  }
}
</script>

<style>
#score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

#score span {
  font-size: 20px;
}
</style>