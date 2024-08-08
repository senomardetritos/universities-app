<template>
	<div>
		<div class="back-page" @click="back">
			<arrow-left />
			<div>Voltar</div>
		</div>
		<div class="favorite-container" v-if="favorites > 0">
			<div class="favorite-country" v-for="(item, i) in list_countries" :key="i">
				<div v-if="item.items.length > 0">
					<h1>{{ item.name }}</h1>
					<CardsUniversity :universities="item.items" @favorite="loadData" />
				</div>
			</div>
		</div>
		<div v-else>Nenhuma universidade marcada como favorita</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { countries } from '../options/countries';
	import { getStorage } from '../utils/storage';
	import { useFilterStore } from '../stores/filter-store';
	import CardsUniversity from '../components/CardsUniversity.vue';
	import ArrowLeft from '../icons/ArrowLeft.vue';
	import { storeToRefs } from 'pinia';

	const router = useRouter();
	const filter = useFilterStore();
	const { favorites } = storeToRefs(filter);

	const list_countries = ref({});

	onMounted(() => {
		loadData();
	});

	function loadData() {
		const data = Object.entries(countries);
		data.map((item) => {
			list_countries.value[item[0]] = {
				name: item[1],
				items: [],
			};
			const country = getStorage(item[0]);
			const favorites = getStorage('favorite');
			country.map((item_country) => {
				if (favorites.includes(item_country.name)) {
					item_country.check = true;
					list_countries.value[item[0]].items.push(item_country);
				}
			});
		});
		filter.setFavorites();
	}

	function back() {
		router.push('/');
	}
</script>

<style scoped>
	.back-page {
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: row;
		gap: 12px;
		cursor: pointer;
	}
	.favorite-country h1 {
		font-size: 24px;
		margin: 34px 0 0 0;
	}
</style>
