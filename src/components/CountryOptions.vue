<template>
	<div class="count-options">
		<ul>
			<li :class="i == country ? 'active' : ''" v-for="(item, i) in list_countries" :key="i" @click="change(i)">
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { countries } from '../options/countries';
	import { useFilterStore } from '../stores/filter-store';

	const list_countries = ref(countries);
	const filter = useFilterStore();
	const { country } = storeToRefs(filter);

	function change(i) {
		filter.setCountry(i);
	}
</script>

<style scoped>
	.count-options {
		padding: 12px 0;
	}
	.count-options ul {
		display: flex;
		justify-content: start;
		flex-direction: row;
		column-gap: 20px;
		margin: 0;
		padding: 0;
	}
	.count-options li {
		list-style: none;
		cursor: pointer;
	}
	.count-options li.active {
		border-bottom: 2px solid var(--color-orange);
		font-weight: 600;
	}
</style>
