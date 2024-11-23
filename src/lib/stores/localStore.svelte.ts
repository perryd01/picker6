import { browser } from '$app/environment';

export class LocalStore<T> {
	value = $state<T>() as T;
	#key = '';
	#loaded = false;

	constructor(key: string, value: T) {
		this.#key = key;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
			this.#loaded = true;
		}

		$effect(() => {
			localStorage.setItem(this.#key, this.serialize(this.value));
		});
	}

	get isLocalStorageLoaded() {
		return this.#loaded;
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		return JSON.parse(item);
	}
}
