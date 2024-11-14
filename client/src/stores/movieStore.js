import { ref } from 'vue';
import { defineStore } from 'pinia';
import movieService from '@/services/movieService';

export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref([]);

    const getMovies = async () => {
        try {
            movies.value = await movieService.getMovies();
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };

    const syncMovies = async () => {
        try {
            movies.value = await movieService.syncMovies();
        } catch (error) {
            console.error('Failed to sync movies:', error);
        }
    };

    const toggleWatched = async (movie) => {
        try {
            const { id, watched } = movie;
            const updatedMovie = await movieService.patchMovie(id, { watched: !watched });
            movies.value = movies.value.map((m) => (m.id === id ? updatedMovie : m));
        } catch (error) {
            console.error('Failed to update movie:', error);
        }
    };

    return {
        movies,
        getMovies,
        syncMovies,
        toggleWatched,
    };
});
