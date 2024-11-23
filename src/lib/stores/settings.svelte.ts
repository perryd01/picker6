import { LocalStore } from './localStore.svelte';

interface ISettings {
	shuffleTime: number;
}

const defaults: ISettings = {
	shuffleTime: 2
};

export class SettingsStore extends LocalStore<ISettings> {
	constructor() {
		super('settings', defaults);
	}
}

export function createSettingsStore() {
	return new SettingsStore();
}
