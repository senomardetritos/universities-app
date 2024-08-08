import { defineStore } from 'pinia';

export const useUniversityStore = defineStore('university-store', {
	state() {
		return {
			university: null,
		};
	},

	actions: {
		setUniversity(university) {
			this.university = university;
		},
	},

	getters: {},
});
