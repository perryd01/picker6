<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import clsx from 'clsx';

	interface Props {
		name: string;
		icon: string;
		selected: boolean;
		pressed: () => void;
	}

	let { name, icon, selected, pressed }: Props = $props();
</script>

<Card.Root class={clsx(selected && 'bg-primary', 'cursor-pointer')} onclick={pressed}>
	<Card.Content>
		<div class="flex select-none flex-col items-center justify-between">
			<div class="flex flex-col items-center">
				<img
					class={clsx('aspect-square size-16 object-fill', !selected && 'saturate-0')}
					src={icon}
					alt={name}
				/>
				<span class={clsx('text-lg font-semibold', selected && 'text-primary-foreground')}
					>{name}</span
				>
			</div>
		</div>
	</Card.Content>
</Card.Root>
