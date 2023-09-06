# conversAI
![image](https://user-images.githubusercontent.com/1352590/223443413-f5ae387f-837b-4e9a-b297-fd68ed46487e.png)


## Requirements

- OpenAI key (added to .env `OPENAI_API_KEY=xxx`)
- Node 18

## Develop


### Run watched frontend and backend concurrently
```sh
npm ci
npm run watch:dev
```

## Production

Add the full URL the site will run on into the .env and allow override of default.settings as seen below
```
# API KEYS
OPENAI_API_KEY=key
ELEVEN_API_KEY=key

# REACT APP SETTINGS - ADD ANY PROPERTIES HERE TO OVERRIDE THE DEFAULT
REACT_APP_SETTINGS='{"production": false,"debugMode": false,"apiURL": "http://localhost:3001","useTextToVoice":false,"useVoiceToText":false,"managerSelection":"auto","employeeSelection":"auto"}'

# AWS
export AWS_ACCESS_KEY_ID=key
export AWS_SECRET_ACCESS_KEY=key
export AWS_REGION=us-east-2

```

```sh
npm run build && npm run start
```


# Converse Application Settings

Below are the available settings for the Converse application and their possible values.
Note that any/all of these values can be overwritten in the .env file:

| Setting | Description | Possible Values |
| ------- | ----------- | --------------- |
| `useVoiceToText` | Determines whether the application uses voice-to-text functionality. | `true` or `false` |
| `useTextToVoice` | Determines whether the application uses text-to-voice functionality. | `true` or `false` |
| `preferredAudio` | Determines the preferred audio source for the application. | `eleven` or `aws` |
| `managerSelection` | Determines the selection mode for managers. | `auto` or `manual` |
| `employeeSelection` | Determines the selection mode for employees. | `auto` or `manual` |
| `randomizeCharacterValues` | Determines whether the application randomizes character values. | `true` or `false` |
| `allowCharacterValueEditing` | Determines whether the application allows editing of character values. | `true` or `false` |
| `showScenarioOnEntry` | Determines whether the application shows the scenario on entry. | `true` or `false` |
| `delayOnChatStart` | Determines the delay in milliseconds before the chat starts. | An integer greater than or equal to 0. |
| `useTimer` | Determines whether the application uses a timer. | `true` or `false` |
| `apiURL` | Determines the API URL for the application. | A string containing a valid URL. |
| `restartChatAfterfeedback` | Determines whether the application restarts the chat after receiving feedback. | `true` or `false` |
| `allowXLSXExport` | Determines whether the application allows exporting to XLSX. | `true` or `false` |
| `model` | Determines the GPT model used by the application. | A string containing the GPT model name, such as `"text-davinci-003" or "gpt-4", etc.`.


