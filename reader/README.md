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


```sh
npm run build && npm run start
```
