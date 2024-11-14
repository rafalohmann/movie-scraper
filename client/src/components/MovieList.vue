<template>
    <div>
        <div v-if="movies.length" class="row mt-3">
            <div class="col-md-4" v-for="movie in movies" :key="movie.id">
                <MovieCard :movie="movie" @toggle-watched="toggleWatched" />
            </div>
        </div>
        <div v-else class="alert alert-warning mt-3" role="alert">
            <font-awesome-icon :icon="['fa', 'exclamation-triangle']" />
            <span class="mx-2"> No movies available. </span>
        </div>
    </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();

defineProps({
    movies: {
        type: Array,
    },
});

const { toggleWatched } = movieStore;
</script>
