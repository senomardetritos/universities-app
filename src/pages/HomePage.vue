<template>
	<div>
		<country-options />
		<div v-if="universities">
			<div v-if="listUniversities.length > 0">
				<CardsUniversity :universities="listUniversities" @favorite="refreshList" />
			</div>
			<div v-else>
				Nenhuma universidade encontrada com a palavra <b>{{ search }}</b>
			</div>
		</div>
		<div v-else>Carregando</div>
		<div class="load-more" v-if="universities && universities.length >= limit">
			<div class="load-button" @click="loadMore">
				<ArrowClockwise />
				<div>Carregar Mais</div>
			</div>
			<div>Mostrando {{ limit }} de {{ universities?.length }}</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, watch, computed } from 'vue';
	import axios from 'axios';
	import { storeToRefs } from 'pinia';
	import { useFilterStore } from '../stores/filter-store';
	import { getStorage, setStorage } from '../utils/storage';
	import CountryOptions from '../components/CountryOptions.vue';
	import CardsUniversity from '../components/CardsUniversity.vue';
	import ArrowClockwise from '../icons/ArrowClockwise.vue';

	const filter = useFilterStore();
	const { country, search, limit } = storeToRefs(filter);
	const universities = ref(null);

	const listUniversities = computed(() => {
		const data = getStorage('favorite');
		universities.value.map((item) => {
			if (data.includes(item?.name)) {
				item.check = true;
			} else {
				item.check = false;
			}
		});
		filter.setFavorites();
		return universities.value.filter((item, i) => {
			if (i < limit.value) {
				return item.name.toLowerCase().includes(search.value.toLowerCase());
			}
		});
	});

	onMounted(async () => {
		await loadData();
	});

	watch(country, async () => {
		await loadData();
	});

	async function loadData() {
		universities.value = null;
		const data = getStorage(country.value);
		if (data) {
			universities.value = data;
		} else {
			const res = await axios.get('http://universities.hipolabs.com/search?country=' + country.value);
			universities.value = res.data;
			setStorage(country.value, res.data);
		}
	}

	function refreshList() {
		listUniversities.effect.run();
	}

	function loadMore() {
		filter.setLimit(limit.value + 20);
	}
</script>

<style scoped>
	.load-more {
		display: flex;
		flex-direction: row;
		margin: 24px 0;
		align-items: center;
		justify-content: space-between;
	}
	.load-more .load-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}
	.load-more .load-button * {
		cursor: pointer;
	}
</style>
