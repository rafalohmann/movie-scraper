import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './styles/main.css';

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import FontAwesome core and Vue component
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons
import {
    faExclamationTriangle,
    faFilm,
    faRotate,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faExclamationTriangle, faFilm, faRotate, faSearch);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(createPinia());

app.mount('#app');
