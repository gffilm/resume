
import fantasy from "./../assets/json/fantasy.json";

import mystery from "./../assets/json/mystery.json";

import scary from "./../assets/json/scary.json";

import silly from "./../assets/json/silly.json";

class ScenarioService {

	constructor() {
		this.situationIndex = 0;
		this.scenario = {};
		this.userGoals = [];
		this.gptGoals = [];
		this.manager = {};
		this.situation = null;
		this.initialized = false;
	}


	setSituation(type) {
		switch (type) {
			case 'fantasy':
				this.situation = fantasy;
				this.initialized = true;
				break;
			case 'mystery':
				this.situation = mystery;
				this.initialized = true;
				break;
			case 'scary':
				this.situation = scary;
				this.initialized = true;
				break;
			case 'silly':
				this.situation = silly;
				this.initialized = true;
				break;
			default:
				console.log(`Unknown type ${type}`);
		}
	}

	isInitialized() {
		return this.initialized;
	}

	getSituation() {
		return this.situation;
	}

};

const scenarioService = new ScenarioService();
export default scenarioService;
window.myS = scenarioService;
