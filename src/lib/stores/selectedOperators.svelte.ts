import { browser } from '$app/environment';
import data from '$lib/generated/data.json';

type OperatorSide = 'attacker' | 'defender';

interface IOperator {
	name: string;
	icon: string;
	character: string;
	side: string;
}

interface ISelectedOperator extends IOperator {
	selected: boolean;
}

export class SelectedOperatorsStore {
	readonly key = 'selectedOperators';
	#store = $state<ISelectedOperator[]>([]);

	constructor() {
		if (browser) {
			const item = localStorage.getItem(this.key);
			if (item) {
				this.#store = this.deserialize(item);
			} else {
				this.#store = data.map((e) => ({ ...e, selected: false }));
			}
		}

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.#store));
		});
	}

	get operators() {
		return this.#store;
	}

	private getBySide(side: OperatorSide) {
		return this.#store.filter((e) => e.side === side);
	}

	get attackers() {
		return this.getBySide('attacker').sort((a, b) => a.name.localeCompare(b.name));
	}

	get defenders() {
		return this.getBySide('defender').sort((a, b) => a.name.localeCompare(b.name));
	}

	toggle(name: string) {
		const index = this.#store.map((e) => e.name).indexOf(name);
		this.#store[index].selected = !this.#store[index].selected;
	}

	all() {
		this.#store = this.#store.map((e) => ({
			...e,
			selected: true
		}));
	}
	reset() {
		this.#store = this.#store.map((e) => ({
			...e,
			selected: false
		}));
	}

	private serialize(value: ISelectedOperator[]): string {
		return JSON.stringify(value);
	}

	private deserialize(item: string): ISelectedOperator[] {
		return JSON.parse(item);
	}
}
