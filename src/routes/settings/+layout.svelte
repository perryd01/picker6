<script lang="ts">
	let { children } = $props();

	import { page } from '$app/stores';

	const activeTab: 'features' | 'operators' = $derived.by(() => {
		const pathname = $page.url.pathname.slice(1);
		if (pathname === 'settings') return 'features';
		if (pathname === 'settings/operators') return 'operators';
		return 'features';
	});
	$inspect(activeTab);
</script>

<div class="tabs">
	<a class:active={activeTab === 'features'} href="/settings">Features</a>
	<a class:active={activeTab === 'operators'} href="/settings/operators">Operators</a>
</div>

{@render children()}

<style lang="postcss">
	.tabs {
		@apply mb-8 grid w-full grid-cols-2 items-center justify-center rounded-md bg-muted px-1 py-1 text-muted-foreground;
		a {
			@apply flex flex-row items-center justify-center py-1 transition-all duration-300;
		}

		.active {
			@apply rounded-sm bg-background px-3 font-medium text-foreground shadow-sm ring-offset-background;
		}
	}
</style>
