<template>
	<div>
		<BookMarkFill class="favorite red" v-if="university.check" @click="favorite(university)" />
		<BookMark class="favorite" v-else @click="favorite(university)" />
	</div>
</template>

<script setup>
	import { defineProps, defineEmits, computed } from 'vue';
	import { getStorage, setStorage } from '../utils/storage';

	import BookMark from '../icons/BookMark.vue';
	import BookMarkFill from '../icons/BookMarkFill.vue';

	const props = defineProps({
		item: Array,
	});

	const emits = defineEmits(['favorite']);

	const university = computed(() => {
		const item = props.item;
		const data = getStorage('favorite');
		if (data) {
			if (data.includes(item.name)) {
				item.check = true;
			} else {
				item.check = false;
			}
		}
		return item;
	});

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
		university.effect.run();
		emits('favorite');
	}
</script>

<style scoped>
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
