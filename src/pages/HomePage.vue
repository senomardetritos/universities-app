<template>
	<div>
		<div v-if="universities" class="container-university">
			<div class="card-university" v-for="(item, i) in listUniversities" :key="i">
				<h1>{{ item.name }}</h1>
				<a :href="link" target="_blank" v-for="(link, j) in item.web_pages" :key="j">{{ link }}</a>
			</div>
		</div>
		<div v-else>Carregando</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, watch, computed } from 'vue';
	import axios from 'axios';
	import { storeToRefs } from 'pinia';
	import { useFilterStore } from '../stores/filter-store';

	const filter = useFilterStore();
	const { country, search } = storeToRefs(filter);
	const universities = ref(null);

	const listUniversities = computed(() => {
		return universities.value.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()));
	});

	onMounted(async () => {
		await loadData();
	});
	watch(country, async () => {
		await loadData();
	});

	async function loadData() {
		universities.value = null;
		const res = await axios.get('http://universities.hipolabs.com/search?country=' + country.value);
		universities.value = res.data;
	}
</script>

<style scoped>
	.container-university {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 20px;
		max-width: 100vw;
		padding-top: 24px;
	}
	.card-university {
		background-color: white;
		border-radius: 12px;
		box-shadow: 0px 0px 10px -8px #000;
		width: calc(100% - 100px);
		padding: 12px 24px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.card-university h1 {
		font-size: 22px;
		cursor: pointer;
	}
	.card-university a {
		display: block;
		font-size: 12px;
	}
</style>
