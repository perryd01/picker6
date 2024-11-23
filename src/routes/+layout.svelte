<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { House, Settings } from 'lucide-svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import '../app.css';
	let { children } = $props();
</script>

<Toaster />

<div class="flex size-full min-h-svh flex-col justify-between">
	<header
		class="sticky left-0 top-0 z-50 flex flex-row items-center justify-between bg-background p-4 shadow-sm"
	>
		<div>
			<a href="/">
				<h1 class="text-xl font-bold tracking-tight">PickeR6</h1>
			</a>
		</div>
		<div>
			<a href="/">
				<Button variant="outline" size="icon">
					<House class="h-4 w-4" />
				</Button>
			</a>

			<a href="/settings">
				<Button variant="outline" size="icon">
					<Settings class="h-4 w-4" />
				</Button>
			</a>
		</div>
	</header>
	<main class="container size-full grow px-4 py-2">
		{@render children()}
	</main>
</div>
