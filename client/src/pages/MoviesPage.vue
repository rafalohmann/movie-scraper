<template>
    <div class="border-bottom">
        <div class="container">
            <div class="d-flex">
                <SearchInput class="flex-1" />
                <SyncButton @click="syncMovies" />
            </div>
        </div>
    </div>
    <div class="container">
        <MovieList :movies="movies" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import SyncButton from '@/components/SyncButton.vue';
import MovieList from '@/components/MovieList.vue';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();

const { getMovies, syncMovies } = movieStore;

const movies = computed(() => movieStore.movies);

getMovies();
</script>
