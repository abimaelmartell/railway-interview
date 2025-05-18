import { useCallback, useState } from 'react'

import { hasPendingDeployment } from '@/lib/utils'
import { Service, Environment } from '@/lib/gql/types'

import useServiceActions from '@/hooks/useServiceActions'
import useServicePolling from '@/hooks/useServicePolling'

import refreshService from '@/lib/api/refresh-service'

import DeploymentRow from './DeploymentRow'
import ServiceCardHeader from './ServiceCardHeader'

type Props = {
  initialService: Service
  environment: Environment
}

const MAX_POLL_ATTEMPTS = 30
const POLL_INTERVAL_MS = 5000

const ServiceCard = ({ initialService, environment }: Props) => {
  const [service, setService] = useState<Service>(initialService)

  const handleRefresh = useCallback(async () => {
    try {
      const { service: refreshedService } = await refreshService(service.id)

      setService(refreshedService)
    } catch (err) {
      console.error(err)
    }
  }, [service.id])

  const { isSpinningUp, isSpinningDown, handleSpinUp, handleSpinDown } = useServiceActions(
    service,
    handleRefresh,
  )

  const pending = hasPendingDeployment(service.deployments)

  useServicePolling(pending, handleRefresh, POLL_INTERVAL_MS, MAX_POLL_ATTEMPTS)

  const hasRunningDeployment = service.deployments.edges.some(
    (deployment) => deployment.node.status === 'SUCCESS',
  )

  return (
    <div className="border border-gray-200 rounded p-4 bg-gray-50 space-y-3 shadow">
      <ServiceCardHeader service={service} />

      <div className="grid grid-cols-1 gap-2">
        {!hasRunningDeployment && !pending && (
          <DeploymentRow
            isSpinningUp={isSpinningUp}
            onSpinUp={() => handleSpinUp(environment.id)}
          />
        )}

        {service.deployments.edges.map((deployment) => {
          return (
            <DeploymentRow
              key={deployment.node.id}
              deployment={deployment.node}
              isSpinningDown={isSpinningDown}
              onSpinDown={handleSpinDown}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ServiceCard
