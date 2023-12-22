## IniPassion - Backend

### How to run

```sh
npm install
npm run dev #run development server
npm run build #build production
```

### How to deploy

- Setup env variables with `HOST` and `PORT` setup

```sh
 "start": "cross-env NODE_ENV=production npm run build && cross-env NODE_ENV=production medusa start",
```
