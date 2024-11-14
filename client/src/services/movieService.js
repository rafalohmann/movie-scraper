import http from '@/utils/httpCommon';

export default {
    async getMovies() {
        const response = await http.get('/movies');
        return response.data;
    },
    async patchMovie(movieId, data) {
        const response = await http.patch(`/movies/${movieId}`, data);
        return response.data.movie;
    },
    async syncMovies() {
        const response = await http.post('/movies/sync');
        return response.data.movie;
    },
};
