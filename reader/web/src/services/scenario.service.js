
import kayla_fantasy from "./../assets/json/kayla/fantasy.json"

import kayla_mystery from "./../assets/json/kayla/mystery.json"

import kayla_scary from "./../assets/json/kayla/scary.json"

import kayla_silly from "./../assets/json/kayla/silly.json"


import pinchy_fantasy from "./../assets/json/pinchy/fantasy.json"

import pinchy_mystery from "./../assets/json/pinchy/mystery.json"

import pinchy_scary from "./../assets/json/pinchy/scary.json"

import pinchy_silly from "./../assets/json/pinchy/silly.json"

class ScenarioService {

	constructor() {
		this.situationIndex = 0
		this.scenario = {}
		this.userGoals = []
		this.gptGoals = []
		this.manager = {}
		this.situation = null
		this.initialized = false
	}

	getRandom(story) {
		const randomIndex = Math.floor(Math.random() * story.length)
		return story[randomIndex]
	}


	setSituation(type) {
		switch (type) {
			case 'kayla_fantasy':
				this.situation = this.getRandom(kayla_fantasy)
				this.initialized = true
				break
			case 'kayla_mystery':
				this.situation = this.getRandom(kayla_mystery)
				this.initialized = true
				break
			case 'kayla_scary':
	    		this.situation = this.getRandom(kayla_scary)
				this.initialized = true
				break
			case 'kayla_silly':
				this.situation = this.getRandom(kayla_silly)
				this.initialized = true
				break
			case 'pinchy_fantasy':
				this.situation = this.getRandom(pinchy_fantasy)
				this.initialized = true
				break
			case 'pinchy_mystery':
				this.situation = this.getRandom(pinchy_mystery)
				this.initialized = true
				break
			case 'pinchy_scary':
	    		this.situation = this.getRandom(pinchy_scary)
				this.initialized = true
				break
			case 'pinchy_silly':
				this.situation = this.getRandom(pinchy)
				this.initialized = true
				break
			default:
				console.log(`Unknown type ${type}`)
		}
	}

	isInitialized() {
		return this.initialized
	}

	getSituation() {
		return this.situation
	}

}

const scenarioService = new ScenarioService()
export default scenarioService
window.myS = scenarioService
