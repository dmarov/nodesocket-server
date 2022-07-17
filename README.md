# Nodesocket Server

## Example of typescript setup for nodejs server

## Development

- `npm run lint` - to lint code
- `npm run lint:fix` - to fix lint errors
- `npm run dev` - to start development server

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

`configs/` - contains configuration files

