<template>
	<div class="container-university">
		<div class="container-university-item" v-for="(item, i) in universities" :key="i">
			<div class="card-university">
				<book-mark-fill class="favorite red" v-if="item.check" @click="favorite(item)" />
				<book-mark class="favorite" v-else @click="favorite(item)" />
				<h1 @click="openUniversity(item)">{{ item.name }}</h1>
				<a :href="link" target="_blank" v-for="(link, j) in item.web_pages" :key="j">{{ link }}</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, defineEmits } from 'vue';
	import { getStorage, setStorage } from '../utils/storage';
	import { useRouter } from 'vue-router';
	import { useUniversityStore } from '../stores/university-store';

	import BookMark from '../icons/BookMark.vue';
	import BookMarkFill from '../icons/BookMarkFill.vue';

	defineProps({
		universities: Array,
	});

	const emits = defineEmits(['favorite']);
	const router = useRouter();
	const store = useUniversityStore();

	function favorite(item) {
		const data = getStorage('favorite');
		if (data) {
			if (data.includes(item.name)) {
				const index = data.indexOf(item.name);
				data.splice(index, 1);
			} else {
				data.push(item.name);
			}
			setStorage('favorite', data);
		} else {
			setStorage('favorite', [item.name]);
		}
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
	.favorite {
		position: absolute;
		top: 24px;
		right: 24px;
		cursor: pointer;
	}
	.favorite.red {
		color: #ff3300;
	}
</style>
