import { gql } from 'graphql-request'
import railwayApi from './client'

const DELETE_DEPLOYMENT = gql`
  mutation DeleteDeployment($deploymentId: String!) {
    deploymentRemove(id: $deploymentId)
  }
`

export async function removeDeployment(deploymentId: string) {
  return await railwayApi.request(DELETE_DEPLOYMENT, { deploymentId })
}
