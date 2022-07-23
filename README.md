# Nodesocket Server

## Example of simple chat server made using typescript and websocket

## Development

- `npm run lint` - to lint code
- `npm run lint:fix` - to fix lint errors
- `npm run dev` - to start development server
- `npm run test` - to run all unit tests
- `npm run test:watch` - to run tests watcher

## Production

- `npm run build` - to build for production
- `npm run start` - to start production server

## Project structure

`src/di/` - contains files for Dependency Injection

`src/errors/` - contains reusable errors

`src/handlers/` - contains handlers for incomming socket connections

`src/models/api/` - contains models for intercommunication with client

`src/models/contracts/` - contains models for intercommunication between services

`src/models/entities/` - contains models for interaction with database

`src/services/` - contains services with application business logic

`src/utils/` - contains auxilary static methods

# Containers

## Development

`docker-compose up [-d]` - to build and run development container

`docker-compose down --volumes` - to stop container and clear volumes

## Production

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d ` - to run detached production container
