<script lang="ts">
	import { Slider } from '$lib/components/ui/slider/index.js';
	import { createSettingsStore, SettingsStore } from '$lib/stores/settings.svelte';

	const store = createSettingsStore();

	let shuffleProxy = $state([store.value.shuffleTime]);

	$effect(() => {
		store.value.shuffleTime = shuffleProxy[0];
	});

	$inspect(store.isLocalStorageLoaded);
</script>

<h1 class="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Features</h1>

<section class="py-4">
	<p class="mb-4 select-none text-lg text-muted-foreground">
		Time to shuffle operators: {shuffleProxy} seconds
	</p>
	<Slider min={1} max={5} step={0.5} bind:value={shuffleProxy} />
</section>
