<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { RotateCcw } from 'lucide-svelte';

	let mode = $state<'attacker' | 'defender' | 'all'>('all');
</script>

<svelte:head>
	<title>PickeR6</title>
</svelte:head>

<div class="flex h-full flex-col gap-4">
	<div class="flex aspect-square max-w-96 grow rounded-md bg-gray-200"></div>

	<footer class="flex flex-col gap-2">
		<div class="flex flex-row justify-between gap-2">
			<div class="grid w-full grid-cols-2 gap-2">
				<Button
					variant={mode === 'attacker' ? undefined : 'outline'}
					onclick={() => (mode = 'attacker')}>Attacker</Button
				>
				<Button
					variant={mode === 'defender' ? undefined : 'outline'}
					onclick={() => (mode = 'defender')}>Defender</Button
				>
			</div>
			<Button
				variant="outline"
				size="icon"
				onclick={() => (mode = 'all')}
				class="col-span-1 flex flex-row items-center justify-center"
				><RotateCcw />
			</Button>
		</div>
		<Button>Shuffle</Button>
	</footer>
</div>

<style lang="postcss">
</style>
