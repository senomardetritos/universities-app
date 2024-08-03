<template>
	<header>
		<div class="logo">Universities</div>
		<div class="header-right">
			<div class="header-search">
				<input type="text" placeholder="Procurando por algo?" />
				<search-icon />
			</div>
			<div class="header-bag">
				<bag-heart />
			</div>
		</div>
	</header>
</template>

<script setup>
	import BagHeart from '../icons/BagHeart.vue';
	import SearchIcon from '../icons/SearchIcon.vue';
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
		padding: 12px;
	}
</style>
