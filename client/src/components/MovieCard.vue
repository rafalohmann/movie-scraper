<template>
    <div class="card mb-3 shadow-sm">
        <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
                {{ movie.title }}
                <span class="ms-2 badge bg-info">{{ movie.year }}</span>
            </h5>
            <p class="card-text">
                <i class="fa fa-video-camera me-2"></i>
                <strong>Director:</strong> {{ movie.director }}
            </p>
            <p class="card-text">
                <i class="fa fa-film me-2"></i>
                <strong>Genre:</strong> {{ movie.genre }}
            </p>
            <button @click="toggleWatched" class="btn btn-outline-success">
                <i :class="movie.watched ? 'fa fa-check-circle' : 'fa fa-circle'"></i>
                {{ movie.watched ? 'Mark as Unwatched' : 'Mark as Watched' }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true,
        },
    },
    methods: {
        toggleWatched() {
            this.$emit('toggle-watched', this.movie);
        },
    },
};
</script>

<style scoped>
.card {
    border-radius: 8px;
}
</style>
