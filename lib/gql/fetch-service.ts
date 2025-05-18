import { gql } from 'graphql-request'
import railwayApi from './client'
import { Service } from './types'

const QUERY = gql`
  query ($serviceId: String!) {
    service(id: $serviceId) {
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
`

export const fetchService = async (serviceId: string) => {
  const data = await railwayApi.request<{ service: Service }>(QUERY, { serviceId })

  return data.service
}
