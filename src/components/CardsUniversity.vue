<template>
	<div class="container-university">
		<div class="container-university-item" v-for="(item, i) in listUniversities" :key="i">
			<div class="card-university">
				<FavoriteButton :item="item" @favorite="favorite" />
				<h1 @click="openUniversity(item)">{{ item.name }}</h1>
				<a :href="link" target="_blank" v-for="(link, j) in item.web_pages" :key="j">{{ link }}</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, defineProps, defineEmits } from 'vue';
	import { useRouter } from 'vue-router';
	import { useUniversityStore } from '../stores/university-store';
	import { useFilterStore } from '../stores/filter-store';
	import { storeToRefs } from 'pinia';

	import FavoriteButton from '../components/FavoriteButton.vue';

	const props = defineProps({
		universities: Array,
	});
	const emits = defineEmits(['favorite']);

	const filter = useFilterStore();
	const { limit } = storeToRefs(filter);

	const router = useRouter();
	const store = useUniversityStore();

	const listUniversities = computed(() => {
		if (props.universities) {
			return props.universities.filter((item, i) => {
				if (i < limit.value) {
					return true;
				}
				return false;
			});
		}
		return [];
	});

	function favorite() {
		emits('favorite');
	}

	function openUniversity(item) {
		store.setUniversity(item);
		router.push('/university');
	}
</script>

<style scoped>
	.container-university {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding-top: 24px;
		margin: -12px;
	}
	.container-university-item {
		width: 100%;
	}
	.card-university {
		background-color: white;
		border-radius: 12px;
		box-shadow: 0px 0px 10px -8px #000;
		padding: 12px 24px;
		margin: 12px;
		width: auto;
		height: calc(100% - 48px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
	.card-university h1 {
		color: var(--text-dark);
		font-size: 22px;
		width: calc(100% - 24px);
		cursor: pointer;
	}
	.card-university a {
		display: block;
		font-size: 12px;
	}
</style>
