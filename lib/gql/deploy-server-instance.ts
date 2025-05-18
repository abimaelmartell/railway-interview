import { gql } from 'graphql-request'
import railwayApi from './client'

const SERVICE_INSTANCE_DEPLOY = gql`
  mutation DeployServiceInstance($environmentId: String!, $serviceId: String!) {
    serviceInstanceDeploy(environmentId: $environmentId, serviceId: $serviceId)
  }
`

export const deployServiceInstance = async (serviceId: string, environmentId: string) => {
  return await railwayApi.request(SERVICE_INSTANCE_DEPLOY, {
    serviceId,
    environmentId,
  })
}
