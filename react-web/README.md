# Ama Sua

> The best way to get information about peruvian politicians

## Disclaimer: Right now the site has minimal css to get an acceptable expirience in mobile devices.

### Requirements

1. nodeJs 8.x.x
2. npm 6.x.x
3. An [algolia](https://algolia.com) account. It has a free plan.

### Development

1. Install dependencias

```bash
npm i
```

2. Create an index called **prod_politicians** in your algolia account and upload the **politicians.json** file from the example-data folder.

3. Create a .env.local file with the following variables. You must get these values from the algolia dashboard.

```
REACT_APP_ALGOLIA_API_KEY=cf94deedda58dde518d8eca41f5d217c
REACT_APP_ALGOLIA_APP_ID=U7J3TR8BBT
REACT_APP_ALGOLIA_BASE_URL=https://U7J3TR8BBT-dsn.algolia.net
REACT_APP_ALGOLIA_POLITICIANS_URL=1/indexes/prod_politician
```

2. Start the server

```bash
npm start
```

3. That's it, happy coding.

### Testing

WIP, stay tuned!

### Deployment

```bash
npm run build
```

It will generate a **build** folder that you can deploy to any web server. You should use [netlify](https://netlify.com).
