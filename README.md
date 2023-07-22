# Instalation

1. Clone repo
1. Run `pnpm i`
1. Change the example env file to `.env`
1. In the `.env` put your traefik http api server address and port

## Run the App

To run the app run:

```bash
pnpm run run:dev
```

### The app will be available at you localhost port 4001

- If you get an error saying that the port is been use you can run `lsof -ti :4001 | xargs kill -9` to kill the process running in that port.
