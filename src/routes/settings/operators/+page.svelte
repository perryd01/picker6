<script lang="ts">
	import OpButton from '$lib/components/OpButton.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { SelectedOperatorsStore } from '$lib/stores/selectedOperators.svelte';
	const store = new SelectedOperatorsStore();

	$inspect(store.operators);

	function onOperatorClick(name: string) {
		return store.toggle(name);
	}
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<h1 class="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Owned operators</h1>

<div class="flex flex-row justify-between gap-2">
	<Button class="w-full" variant="outline" onclick={() => store.reset()}>Select None</Button>
	<Button class="w-full" variant="outline" onclick={() => store.all()}>Select All</Button>
</div>

<div class="grid gap-8 py-4">
	{#each [{ label: 'Attackers', operators: store.attackers }, { label: 'Defenders', operators: store.defenders }] as { label, operators }}
		<section>
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				{label}
			</h2>
			<ul class="grid grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-6">
				{#each operators as { name, icon, selected }}
					<OpButton {name} {icon} {selected} pressed={() => onOperatorClick(name)} />
				{:else}
					{#each Array.from(Array(12).keys()) as x}
						<Card class="p-6">
							<Skeleton class="size-16" />
						</Card>
					{/each}
				{/each}
			</ul>
		</section>
	{/each}
</div>
