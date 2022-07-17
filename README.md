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

`di/` - contains files for Dependency Injection
`errors/` - contains reusable errors
`handlers/` - contains handlers for incomming socket connections
`models/api/` - contains models for intercommunication with client
`models/contracts/` - contains models for intercommunication between services
`models/entities/` - contains models for interaction with database
`services/` - contains services with application business logic
`utils/` - contains auxilary static methods
