<template>
	<div>
		<BackButton page="/" />
		<div class="university-page" v-if="university">
			<h3>{{ university.country }}</h3>
			<h1>{{ university.name }}</h1>
			<div class="university-page-description">
				<div v-if="data">
					<div v-if="data.error || !data?.metas?.description">Descrição não disponibilizada...</div>
					<div v-else>
						{{ data?.metas?.description }}
					</div>
				</div>
				<div v-else>Carregando...</div>
			</div>
			<div class="university-page-link">
				<a :href="link" target="_blank" v-for="(link, j) in university.web_pages" :key="j">{{ link }}</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import { useRouter } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useUniversityStore } from '../stores/university-store';
	import BackButton from '../components/BackButton.vue';

	const router = useRouter();
	const store = useUniversityStore();
	const { university } = storeToRefs(store);
	const data = ref(null);

	onMounted(async () => {
		if (!university.value) {
			router.push('/');
			return;
		}
		try {
			const res = await axios.get('https://senomalabs.com/get-meta-tag/?url=' + university.value.web_pages[0]);
			if (res && res.data) {
				data.value = res.data;
			}
		} catch (e) {
			console.log(e);
		}
	});
</script>

<style scoped>
	.university-page {
		background: #fff;
		padding: 24px;
		margin-top: 24px;
		border-radius: 12px;
		box-shadow: 0px 0px 10px -8px #000;
	}
	.university-page h3,
	.university-page h1 {
		margin: 0;
		padding: 0;
		color: var(--text-dark);
	}
	.university-page .university-page-description {
		margin-top: 12px;
	}
	.university-page .university-page-link {
		margin-top: 24px;
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.university-page .university-page-link a {
		background: white;
		padding: 12px 24px;
		border-radius: 12px;
		box-shadow: 0px 0px 10px -8px #000;
		background: var(--text-dark);
		color: white;
		text-decoration: none;
	}
</style>
