<template>
    <div class="options-container">
        <ul>
            <li
                v-for="pokemon in pokemons"
                :key="pokemon.id"
                :disabled="disabledButtons ? '' : 'disabled'"
                @click="$emit('selection', pokemon )"
            >
                {{ pokemon.name.toUpperCase() }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pokemons: {
            type: Array,
            required: true,
            default: []
        },
        disabledButtons: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    padding: 10px;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>