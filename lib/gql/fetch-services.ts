import { gql } from 'graphql-request'

import railwayApi from './client'
import { ProjectsWithServicesData } from './types'

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
                      deployments {
                        edges {
                          node {
                            id
                            status
                            createdAt
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

export const fetchProjectsWithServices = async () => {
  const data = await railwayApi.request<ProjectsWithServicesData>(QUERY)

  return data
}
