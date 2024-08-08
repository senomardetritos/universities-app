import { getStorage } from '@/utils/storage';
import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter-store', {
	state() {
		return {
			country: 'Brazil',
			search: '',
			favorites: 0,
			limit: 20,
		};
	},

	actions: {
		setCountry(country) {
			this.country = country;
			this.limit = 20;
		},
		setSearch(search) {
			this.search = search;
			this.limit = 20;
		},
		setFavorites() {
			const data = getStorage('favorite');
			this.favorites = data?.length;
		},
		setLimit(limit) {
			this.limit = limit;
		},
	},

	getters: {},
});
