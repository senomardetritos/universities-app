<template>
	<div>
		<header-page />
		<main>
			<RouterView />
		</main>
	</div>
</template>

<script setup>
	import { RouterView } from 'vue-router';
	import HeaderPage from './components/HeaderPage.vue';
</script>

<style scoped>
	main {
		display: flex;
		align-items: start;
		justify-content: space-between;
		flex-direction: column;
		padding: 12px 16px;
		background-color: inherit;
	}
</style>
