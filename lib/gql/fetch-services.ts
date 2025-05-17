import { gql } from 'graphql-request'
import railwayApi from './client'

const QUERY = gql`
  query {
    me {
      workspaces {
        name
        id
        team {
          projects {
            edges {
              cursor
              node {
                id
                name
                environments {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
                services {
                  edges {
                    node {
                      id
                      name
                      icon
                      repoTriggers {
                        edges {
                          node {
                            provider
                          }
                        }
                      }
                      deployments {
                        edges {
                          node {
                            id
                            status
                            createdAt
                            meta
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export type RailwayServiceStatus = 'SUCCESS' | 'FAILED' | 'REMOVED' | 'RUNNING' | string

type Nodes<T> = {
  edges: {
    node: T
  }[]
}

export type Deployment = {
  id: string
  status: RailwayServiceStatus
  createdAt: string
}

export type Service = {
  id: string
  name: string
  icon: string | null
  deployments: Nodes<Deployment>
  repoTriggers: Nodes<RepoTrigger>
}

export type Project = {
  id: string
  name: string
  services: Nodes<Service>
  environments: Nodes<RailwayEnvironment>
}

export type Workspace = {
  id: string
  name: string
  team: {
    projects: Nodes<Project>
  }
}

export type RepoTrigger = {
  provider: string
}

export type RailwayProjectsWithServicesData = {
  me: {
    workspaces: Workspace[]
  }
}

export type RailwayEnvironment = {
  id: string
  name: string
}

export type RailwayEnvironmentEdge = {
  node: RailwayEnvironment
}

export const fetchProjectsWithServices = async () => {
  const data = await railwayApi.request<RailwayProjectsWithServicesData>(QUERY)

  return data
}
