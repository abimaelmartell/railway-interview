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

| Operation | Description |
|-----------|-------------|
| `serviceInstanceDeploy` | Spins up a new deployment of a service |
| `deploymentRemove` | Deletes an existing deployment |
| `me.workspaces.projects.services.deployments` | Query for rendering the UI |

## Notes

- Spin down is handled by calling deploymentRemove on the active deployment.
- Spin up triggers a build process via serviceInstanceDeploy, which may take a few seconds.
- After actions, the UI waits a few seconds and re-fetches via router.replace() to stay in sync.

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
