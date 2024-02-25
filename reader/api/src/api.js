const axios = require('axios')
const { logTime } = require('./utility.js')

class OPENAI_API {
  constructor() {
    const defaultSettings = {
      temperature: 0.9,
      max_tokens: 600,
      top_p: 1,
      frequency_penalty: 0.9,
      presence_penalty: 0.6,
      stop: '',
      model: "text-davinci-003",
      isChatModel: false,
    }

    this.settings = defaultSettings
  }

  async request(input, settings = {}, expectJson = true) {
    let temperature = parseFloat(settings.temperature) || this.settings.temperature,
        max_tokens = parseInt(settings.max_tokens) || this.settings.max_tokens,
        top_p = parseFloat(settings.top_p) || this.settings.top_p,
        frequency_penalty = parseFloat(settings.frequency_penalty) || this.settings.frequency_penalty,
        presence_penalty = parseFloat(settings.presence_penalty) || this.settings.presence_penalty,
        stop = settings.stop || this.settings.stop,
        model = settings.model || this.settings.model,
        isChatModel = ['gpt-4', 'gpt-3.5-turbo'].indexOf(model) > -1

    logTime('STARTING API REQUEST')
    console.log(`API SETTINGS \n`)
    console.log(`model: ${model}`)
    console.log(`TEMP ${temperature}`)
    console.log(`max_tokens: ${max_tokens}`)
    console.log(`top_p: ${top_p}`)
    console.log(`frequency_penalty: ${frequency_penalty}`)
    console.log(`presence_penalty: ${presence_penalty}\n`)
    console.log(`Chat Model: ${isChatModel}\n`)

    let requestModel = this.getRequestModel(settings)

    if (isChatModel) {
      requestModel.messages = input
      return this.sendRequst('https://api.openai.com/v1/chat/completions', requestModel, expectJson)
    } else {
      requestModel.prompt = input
      return this.sendRequst('https://api.openai.com/v1/completions', requestModel, expectJson)
    }
  }

  getRequestModel(settings) {
    let temperature = parseFloat(settings.temperature) || this.settings.temperature,
        max_tokens = parseInt(settings.max_tokens) || this.settings.max_tokens,
        top_p = parseFloat(settings.top_p) || this.settings.top_p,
        frequency_penalty = parseFloat(settings.frequency_penalty) || this.settings.frequency_penalty,
        presence_penalty = parseFloat(settings.presence_penalty) || this.settings.presence_penalty,
        stop = settings.stop || this.settings.stop,
        model = settings.model || this.settings.model

    console.log(`API SETTINGS \n`)
    console.log(`model: ${model}`)
    console.log(`TEMP ${temperature}`)
    console.log(`max_tokens: ${max_tokens}`)
    console.log(`top_p: ${top_p}`)
    console.log(`frequency_penalty: ${frequency_penalty}`)
    console.log(`presence_penalty: ${presence_penalty}\n`)

    return {
        "model": model,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "top_p": top_p,
        "frequency_penalty": frequency_penalty,
        "presence_penalty": presence_penalty,
        "stop": stop,
    }
  }


  async sendRequst(url, requestModel, expectJson) {
    logTime('STARTING API REQUEST')
    console.log(requestModel)
    return new Promise((resolve, reject) => {
      axios.post(url, requestModel, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }).then(response => {
        let rawResponse = '',
            cleanRespose = '',
            apiResponse = null,
            status = false,
            error = null
        try {
          if (response.data.choices[0].message) {
            rawResponse = response.data.choices[0].message.content
          } else {
            rawResponse = response.data.choices[0].text
          }
          console.log(rawResponse)
        } catch (e) {
          error = e.message
        }
        if (!error) {
          console.log(`\nRAW RESPONSE \n${rawResponse}`)
          cleanRespose = rawResponse.replace(/^\s+/, '').replace(/\n+$/, '')
          cleanRespose = cleanRespose.replace(/(\r\n|\n|\r)/gm, "")
          cleanRespose = cleanRespose.replace('RESPONSE:', '')
          console.log(`\nTRIMMED RESPONSE \n${cleanRespose}`)
          try {
            if (expectJson) {
              cleanRespose = cleanRespose.substring(cleanRespose.indexOf('{'))
              apiResponse = JSON.parse(cleanRespose)
            } else {
              apiResponse = cleanRespose
            }
            status = true
          } catch (e) {
            console.log('Error', e)
            error = "Response was not in valid JSON"
            response = cleanRespose
          }
        }
        if (error) {
          console.log(`\nAPI REQUEST FAILED \n${error}`)
        } else {
          console.log(`\nAPI REQUEST PASSED`, apiResponse)
        }
        resolve({status:status, error: error, response: apiResponse, rawResponse: rawResponse})
      })
      .catch(error => {
        console.log(`\nAPI REQUEST FAILED`, error.message)
        resolve({status:false, response: error})
      })
      .finally(() => {
        logTime('FINISHED API REQUEST')
      })
    })
  }


  async checkConnection() {
    if (this.settings.isChatModel) {
      return this.checkGPTChatConnection()
    } else {
      return this.checkGPTConnection()
    }
  }

  async checkGPTChatConnection() {
    const messages = [
        {role:'system', content: 'You are a system, only reply true/false'},
        {role:'user',   content: 'Are you ready for input?'}
    ]

    return this.request(messages, {}, false).then((response) => {
      if (response.status) {
        return `GPT4 Connected: ${response.response}`
      } else {
        return response
      }
    })
  }

  async checkGPTConnection() {
    const prompt = 'Reply true if you are ready for input or false if not'
    return this.request(prompt, {}, false).then((response) => {
      if (response.status) {
        return `GPT Connected: ${response.response}`
      } else {
        return response
      }
    })
  }
}


API = new OPENAI_API()
module.exports = API