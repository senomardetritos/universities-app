import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import FavoritePage from '../pages/FavoritePage.vue';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', name: 'HomePage', component: HomePage },
		{ path: '/favorites', name: 'FavoritePage', component: FavoritePage },
	],
});

export { router };
