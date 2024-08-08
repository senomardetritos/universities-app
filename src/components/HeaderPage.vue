<template>
	<header>
		<div class="logo" @click="home">Universities</div>
		<div class="header-right">
			<div class="header-search">
				<input type="text" placeholder="Procurando por algo?" v-model="search" />
				<search-icon />
			</div>
			<div class="header-bag" @click="showFavorites">
				<bag-heart />
				<div class="favorites" v-if="favorites > 0">
					{{ favorites }}
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useFilterStore } from '../stores/filter-store';
	import { useRouter } from 'vue-router';

	import BagHeart from '../icons/BagHeart.vue';
	import SearchIcon from '../icons/SearchIcon.vue';

	const filter = useFilterStore();
	const { search, favorites } = storeToRefs(filter);
	const router = useRouter();

	onMounted(() => {
		filter.setFavorites();
	});

	function showFavorites() {
		router.push('/favorites');
	}

	function home() {
		router.push('/');
	}
</script>

<style scoped>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		padding: 8px 16px;
		background-color: var(--bg-light);
	}
	header .logo {
		color: var(--text-dark);
		font-size: 12px;
		font-family: 'Saira Stencil One', sans-serif;
		font-weight: 400;
		font-style: normal;
		text-transform: uppercase;
		cursor: pointer;
	}
	.header-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}
	.header-search {
		position: relative;
	}
	.header-search input {
		border: none;
		border-radius: 12px;
		background-color: var(--bg-body);
		padding: 12px 32px 12px 16px;
	}
	.header-search svg {
		position: absolute;
		top: 30%;
		right: 12px;
	}
	.header-bag {
		position: relative;
		padding: 12px;
		cursor: pointer;
	}
	.header-bag svg {
		transform: scale(1.5);
	}
	.header-bag .favorites {
		position: absolute;
		bottom: 5px;
		right: 0px;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		border-radius: 50%;
		background: #ff3300;
		color: white;
	}
</style>
