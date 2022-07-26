# Nodesocket Server

## Requirements

- nodejs 16.x.x

## Example of simple chat server made using typescript and websocket

## Development

- `cp .env.example .env` - create server config
- `npm run lint` - to lint code
- `npm run lint:fix` - to fix lint errors
- `npm run dev:nodocker` - to start development server in local environment
- `npm run dev` - to start development server in docker environment
- `npm run test` - to run all unit tests
- `npm run test:watch` - to run tests watcher

## Production

- `npm run build` - to build for production
- `npm run start` - to start production server

## [Project structure](src)

# Containers

## Development

`docker-compose up --build` - to rebuild and run development container

`docker-compose up -d` - to build and run development container in detached mode

`docker-compose run socket-server bash` - to enter container shell (to install packages and so on)

`docker-compose down --volumes` - to stop detached container and clear volumes

## Production

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d ` - to run detached production container
