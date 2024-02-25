import defaultSettings from "./../assets/json/default.settings.json";

class SettingsService {

	constructor() {
		try {
			this.settings = defaultSettings
		} catch (e) {
			console.error('Settings in the .env file is not properly formatted', e);
			this.settings = defaultSettings;
		}
		const chatModels = ['gpt-4', 'gpt-3.5-turbo'];
		this.settings.isChatModel = chatModels.indexOf(this.settings.model) > -1;
		console.log('settings', this.settings);
	}

	getSettings() {
		return this.settings;
	}
};

const settingsService = new SettingsService();
export default settingsService.getSettings();
