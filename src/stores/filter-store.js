import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter-store', {
	state() {
		return {
			country: 'Brazil',
		};
	},

	actions: {
		setCountry(country) {
			this.country = country;
		},
	},

	getters: {},
});
