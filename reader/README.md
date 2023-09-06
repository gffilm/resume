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

```sh
npm run build && npm run start
```

# Application Settings

Below are the available settings for the application and their possible values.
Note that any/all of these values can be overwritten in the .env file:

| Setting | Description | Possible Values |
| ------- | ----------- | --------------- |
| `useVoiceToText` | Determines whether the application uses voice-to-text functionality. | `true` or `false` |
| `useTextToVoice` | Determines whether the application uses text-to-voice functionality. | `true` or `false` |
| `preferredAudio` | Determines the preferred audio source for the application. | `eleven` or `aws` |
| `apiURL` | Determines the API URL for the application. | A string containing a valid URL. |
| `model` | Determines the GPT model used by the application. | A string containing the GPT model name, such as `"text-davinci-003" or "gpt-4", etc.`.


