require("dotenv").config()
const express = require("express")
const API = require('./api')
const Audio = require('./audio')
const path = require("path")
const app = express()
const port = 3001
const cors = require('cors');

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000")
	res.header(
	"Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept"
	)
	next()
})

app.get("*", (req, res) => {
	res.send({
		status: true
	})
})

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})
