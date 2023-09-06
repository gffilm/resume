require("dotenv").config();
const express = require("express");
const API = require('./api');
const Audio = require('./audio');
const path = require("path");
const app = express();
const port = 3001;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
	"Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/completion", async (req, res) => {
	const {input, employee, settings} = req.body;
	const result = await API.request(input, settings);
	if (!result.status) {
		res.send(result);
		return;
	}
	const audioResponse = await Audio.getAudioFromText(result.response.reply, employee, settings);
	if (audioResponse) {
		result.audioURL = audioResponse.audioURL;
	}
  res.send(result);
});

app.post("/feedback", async (req, res) => {
	const {input, settings} = req.body;
	const result = await API.request(input, settings);
	res.send(result);
});


app.get("/connected", async (req, res) => {
	const result = await API.checkConnection();
	res.send(result);
});

app.post('/audio', upload.single('audioFile'), async (req, res) => {
	const { request } = req.body;
	const file = req.file.buffer;
	const result = await Audio.getTranscriptFromAudio(file, request);
	console.log('result', result);
	res.send(result);
});


app.get("/audio/:fileName", (req, res) => {
	Audio.sendAudio(req.params.fileName, res);
});

app.get("/test11", async (req, res) => {
	const text = req.query.text || 'Enter text in the query string';
	const voice = req.query.voice || 'TxGEqnHWrfWFTfGW9XjX';
	const response = await Audio.getAudioFileElevenLabs(text, voice);
	Audio.sendAudio(response.audioURL, res);
});

app.get("/testaws", async (req, res) => {
	const text = req.query.text || 'Enter text in the query string';
	const voice = req.query.voice || 'Joey';
	const response = await Audio.getAudioFileAWS(text, voice);
	Audio.sendAudio(response.audioURL, res);
});

app.get("/voices", async (req, res) => {
	const response11 = await Audio.getElevenVoices();
	res.send(response11);
});


app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build", "index.html"));
});


app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
