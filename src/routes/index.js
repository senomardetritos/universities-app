import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import FavoritePage from '../pages/FavoritePage.vue';
import UniversityPage from '../pages/UniversityPage.vue';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', name: 'HomePage', component: HomePage },
		{ path: '/favorites', name: 'FavoritePage', component: FavoritePage },
		{ path: '/university', name: 'UniversityPage', component: UniversityPage },
	],
});

export { router };
