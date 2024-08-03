import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';
import './assets/media.css';

import { router } from './routes/index';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
