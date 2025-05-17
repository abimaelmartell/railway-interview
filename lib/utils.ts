import { Service, ServiceStatus } from '@/lib/gql/types'
import { DEPLOYMENT_PENDING_STATUSES } from './constants'

export function mapStatus(status: ServiceStatus) {
  switch (status) {
    case 'SUCCESS':
      return '🟢  Running'
    default:
      return `🟡  ${status}`
  }
}

export const hasPendingDeployment = (deployments: Service['deployments']) => {
  return deployments.edges.some((edge) => DEPLOYMENT_PENDING_STATUSES.includes(edge.node.status))
}
