import { gql } from 'graphql-request'
import railwayApi from './client'

const REMOVE_DEPLOYMENT = gql`
  mutation RemoveDeployment($deploymentId: String!) {
    deploymentRemove(id: $deploymentId)
  }
`

export const removeDeployment = async (deploymentId: string) => {
  return await railwayApi.request(REMOVE_DEPLOYMENT, { deploymentId })
}
