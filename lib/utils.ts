import { Service } from '@/lib/gql/types'
import { DEPLOYMENT_PENDING_STATUSES } from './constants'

export const hasPendingDeployment = (deployments: Service['deployments']) => {
  return deployments.edges.some((edge) => DEPLOYMENT_PENDING_STATUSES.includes(edge.node.status))
}

export const capitalize = (str: string) => {
  const words = str.split(' ')

  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}
