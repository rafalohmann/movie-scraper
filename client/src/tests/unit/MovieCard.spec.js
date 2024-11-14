import { mount } from '@vue/test-utils';
import MovieCard from '@/components/MovieCard.vue';

describe('MovieCard.vue', () => {
    it('renders movie title', () => {
        const movie = {
            title: 'Test Movie',
            year: '2022',
            director: 'John Doe',
            genre: 'Drama',
            watched: false,
        };
        const wrapper = mount(MovieCard, { props: { movie } });
        expect(wrapper.text()).toContain('Test Movie');
    });
});
