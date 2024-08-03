import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter-store', {
	state() {
		return {
			country: 'Brazil',
			search: '',
		};
	},

	actions: {
		setCountry(country) {
			this.country = country;
		},
		setSearch(search) {
			this.search = search;
		},
	},

	getters: {},
});
