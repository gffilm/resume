const { spawn } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const path = require("path");
const axios = require('axios');
const FormData = require('form-data');
const { logTime } = require('./utility.js');

class AUDIO_API {
	constructor() {
		this.debugMode = false;
		this.assets = path.join(__dirname, '../assets');
		if (!fs.existsSync(this.assets)) {
			console.log(`Creating ${this.assets}`);
  			fs.mkdirSync(this.assets);
		}
		this.directory = path.join(this.assets, 'audio');
		if (!fs.existsSync(this.directory)) {
			console.log(`Creating ${this.directory}`);
  			fs.mkdirSync(this.directory);
		}
	}

	generateMD5(string) {
		const md5sum = crypto.createHash('md5');
		md5sum.update(string);
		return md5sum.digest('hex');
	}

	async getAudioFromText(transcript, employee, settings) {
		return new Promise((resolve, reject) => {
			if (!settings.useTextToVoice) {
				resolve(null);
				return;
			}

			if (employee.elevenVoice) {
				resolve(this.getAudioFileElevenLabs(transcript, employee.elevenVoice));
			}
			resolve(null);
		});
	}


	async getAudioFileAWS(transcript, voice) {
		let md5 = this.generateMD5(`${transcript}${voice}_aws`);
		const fileName = `${md5}.mp3`;
		const url = `audio/${fileName}`;
		const filePath = path.join(this.directory, fileName);

		return new Promise((resolve, reject) => {
			if (!voice || !transcript) {
				console.log(`Missing Voice or transcript, ${transcript}, ${voice}`);
				resolve({status: false, audioURL: ""});
				return null;
			}

			if (this.debugMode) {
				resolve({status: true, audioURL: url});
				return;
			}

			if (fs.existsSync(filePath)) {
				console.log('File exists');
				resolve({status: true, audioURL: url});
				return;
			}
		});
	}

	async getAudioFileElevenLabs(transcript, voice) {
		let md5 = this.generateMD5(`${transcript}${voice}_11`);
		const fileName = `${md5}.mp3`;
		const userFilePath = `audio/${fileName}`;
		const filePath = path.join(this.directory, fileName);

		return new Promise(async (resolve, reject) => {
			if (!voice || !transcript) {
				console.log(`Missing Voice or transcript, ${transcript}, ${voice}`);
				resolve({status: false, audioURL: ""});
				return null;
			}

			if (this.debugMode) {
				console.log(`Debug mode`);
				resolve({status: true, audioURL: userFilePath});
				return;
			}

			if (fs.existsSync(filePath)) {
				console.log('File exists');
				resolve({status: true, audioURL: userFilePath});
				return;
			}
			logTime('REQUEST TO ELEVEN LABS');
			console.log(`Request: ${transcript}`);
			console.log(`Voice: ${voice}`);
			const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}`;
			const headers = {
				'accept': 'audio/mpeg',
				'xi-api-key': process.env.ELEVEN_API_KEY,
				'Content-Type': 'application/json'
			};
			const data = {
				text: transcript,
				voice_settings: {
					stability: 0,
					similarity_boost: 0
				}
			};

			try {
				let response = await axios.post(url, data, { headers, responseType: 'stream' });
				const writeStream = fs.createWriteStream(filePath);
				response.data.pipe(writeStream);
				writeStream.on('finish', () => {
					console.log(`Saved audio file to ${filePath}`);
					logTime('FINISH REQUEST FROM ELEVEN LABS');
					resolve({status: true, audioURL: userFilePath});
				});
			} catch (error) {
				logTime(`FAILED REQUEST FROM ELEVEN LABS: ${error.message}`);
				resolve({status: false, audioURL: null})
			}
		});
	}

	async getTranscriptFromAudio(audioFile, request) {
		return new Promise(async (resolve, reject) => {
			if (this.debugMode) {
				resolve({status: true, response: "Debug Mode"});
				return;
			}
			let formData = new FormData(),
				status = true;
  			formData.append('file', audioFile, { filename: 'audioFile.mp3' });
			formData.append('model', 'whisper-1');

			try {
				logTime('REQUESTING AUDIO TRANSCRIPT');
				const result = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
				    headers: {
					    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
					    ...formData.getHeaders()
				    }
				});
				let textReponse = result.data.text.replace(/(\r\n|\n|\r)/gm, "");
				console.log(textReponse);
				if (!textReponse) {
					status = false;
				}
				logTime('FINISHED AUDIO TRANSCRIPT REQUEST');
				resolve({status: status, response: textReponse});
			} catch (e) {
				logTime('AUDIO TRANSCRIPT REQUEST FAILED');
				resolve({status: false, response: `Didn't quite catch that`, error: e.message});
			}
		});
	}


	async getElevenVoices() {
		return new Promise((resolve, reject) => {
			try {
				const url = 'https://api.elevenlabs.io/v1/voices/';
				const headers = {
					'xi-api-key': process.env.ELEVEN_API_KEY,
					'Content-Type': 'application/json'
				};
				axios.get(url, { headers }).then((response) => {
					console.log(response.data);
					let data = response.data;
					resolve({status: true, response:data});
				})
			} catch (err) {
				console.log('Error:', err);
				resolve({status: false, audioURL: null});
			}
		});
	}

	sendAudio(fileName, res) {
		let filePath = fileName;
			filePath = path.join(this.directory, fileName);

		filePath = filePath.replace('\\audio\\audio\\','\\audio\\');
		console.log('filepath', filePath);
		if (!fs.existsSync(filePath)) {
			console.log('File does not exist');
			res.send({status: false, 'error': `File does not exist: ${filePath}`});
			return;
		}

		fs.readFile(filePath, (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).end();
				return;
			}
			res.set("Content-Type", "audio/mp3");
			res.set("Content-Length", data.length);
			res.set("Content-Disposition", `inline; filename=${fileName}`);
			res.send(data);
		});
	}
}

AUDIO = new AUDIO_API();

module.exports = AUDIO;
