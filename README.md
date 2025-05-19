# 🚀 Railway Container UI

A simple, typed UI to spin up and spin down Railway containers using the public GraphQL API.

## Tech Stack

- Next.js
- Tailwind CSS
- TypeScript
- GraphQL

## Features

- List workspaces, projects, services, and deployments
- Spin up a service (serviceInstanceDeploy)
- Spin down a service (deploymentDelete)
- Fully typed with TypeScript
- Styled with Tailwind CSS and CSS variables

## GraphQL Operations Used

| Operation                                     | Description                            |
| --------------------------------------------- | -------------------------------------- |
| `serviceInstanceDeploy`                       | Spins up a new deployment of a service |
| `deploymentRemove`                            | Deletes an existing deployment         |
| `me.workspaces.projects.services.deployments` | Query for rendering the UI             |
| `service`                                     | Query for refreshing a service         |

## Notes

- Spin down is handled by calling deploymentRemove on the active deployment.
- Spin up triggers a build process via serviceInstanceDeploy, which may take a few seconds.
- After actions, the UI performs a targeted refresh of the affected service to stay in sync with the backend.

## Local Setup

```
git clone git@github.com:abimaelmartell/railway-interview.git
cd railway-interview

# Install dependencies
npm install

# Copy the example environment variables file
# Make sure to fill in the RAILWAY_API_KEY
cp .env.example .env

# Run the development server
npm run dev
```

## Improvements

- [x] CI for Build (Tests types)
- [x] Add relative timestamps (date-fns)
- [ ] Toast feedback on spin up/down and errors
- [ ] GraphQL codegen with graphql-codegen
- [ ] Testing

## Tech Decisions

### Next.js + App Router

Chosen for simplicity, built-in SSR, and API route support.

### GraphQL Request

Used graphql-request for minimal, typed GraphQL queries without the overhead of Apollo.

### Manual polling logic

Created a custom useServicePolling hook for fine-grained control over refresh intervals and retry limits without external state libraries.

### Modular component structure

UI is broken down into `ServiceCard`, `DeploymentRow`, `ServiceCardHeader`, and a `useServiceActions` hook to keep logic and presentation decoupled.

### No useMemo / useCallback overuse

React 19 has a new compiler that takes care of memoization of calculated values. Used only where needed (e.g., stable callback for polling).
