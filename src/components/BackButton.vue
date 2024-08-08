<template>
	<div class="back-page" @click="back">
		<arrow-left />
		<div>Voltar</div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue';
	import { useRouter } from 'vue-router';
	import ArrowLeft from '../icons/ArrowLeft.vue';

	const props = defineProps({
		page: String,
	});
	const router = useRouter();

	function back() {
		router.push(props.page);
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
</style>
