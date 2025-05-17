import { useCallback, useEffect, useRef, useState } from 'react'

import { hasPendingDeployment } from '@/lib/utils'
import { Service, Environment } from '@/lib/gql/types'

import LoadingIcon from '@/components/LoadingIcon'
import DeploymentRow from './DeploymentRow'
import ServiceCardHeader from './ServiceCardHeader'

type Props = {
  initialService: Service
  environment: Environment
}

const MAX_POLL_ATTEMPTS = 30
const POLL_INTERVAL_MS = 2000

export default function ServiceCard({ initialService, environment }: Props) {
  const [service, setService] = useState<Service>(initialService)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSpinningUp, setIsSpinningUp] = useState(false)
  const [isSpinningDown, setIsSpinningDown] = useState(false)

  const pollCount = useRef(0)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)

    try {
      const response = await fetch(`/api/refresh-service`, {
        method: 'POST',
        body: JSON.stringify({ serviceId: service.id }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        console.error('Failed to refresh service')
        return
      }

      const data = await response.json()
      setService(data.service)
    } catch (err) {
      console.error(err)
    } finally {
      setIsRefreshing(false)
    }
  }, [service.id])

  const handleSpinDown = async (deploymentId: string) => {
    if (!confirm(`Are you sure you want to spin down service ${service.name}?`)) return

    setIsSpinningDown(true)

    await fetch(`/api/spin-down`, {
      method: 'POST',
      body: JSON.stringify({ deploymentId }),
      headers: { 'Content-Type': 'application/json' },
    })

    setTimeout(() => {
      setIsSpinningDown(false)
      handleRefresh()
    }, 1000)
  }

  const handleSpinUp = async () => {
    if (!confirm(`Are you sure you want to spin up service ${service.name}?`)) return

    setIsSpinningUp(true)

    await fetch(`/api/spin-up`, {
      method: 'POST',
      body: JSON.stringify({
        serviceId: service.id,
        environmentId: environment.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    setTimeout(() => {
      setIsSpinningUp(false)
      handleRefresh()
    }, 1000)
  }

  const hasRunningDeployment = service.deployments.edges.some(
    (deployment) => deployment.node.status === 'SUCCESS',
  )

  const pending = hasPendingDeployment(service.deployments)

  useEffect(() => {
    if (!pending) return

    const interval = setInterval(() => {
      if (pollCount.current >= MAX_POLL_ATTEMPTS) {
        clearInterval(interval)
        return
      }

      pollCount.current += 1
      handleRefresh()
    }, POLL_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      pollCount.current = 0
    }
  }, [pending, handleRefresh])

  return (
    <div className="border border-gray-200 rounded p-4 bg-gray-50 space-y-3 shadow">
      <ServiceCardHeader
        service={service}
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        pending={pending}
      />

      <div className="grid grid-cols-1 gap-2">
        {!hasRunningDeployment && !pending && !isSpinningUp && (
          <button
            className="text-xs font-medium px-3 py-2 rounded transition bg-blue-100 text-blue-800 hover:bg-blue-200"
            onClick={handleSpinUp}
            disabled={isSpinningUp}
          >
            Spin Up Service
          </button>
        )}

        {isSpinningUp && (
          <div className="text-xs font-medium text-blue-700 flex items-center gap-1">
            <LoadingIcon className="w-4 h-4 animate-spin" />
            Spinning up...
          </div>
        )}

        {service.deployments.edges.map((deployment) => {
          return (
            <DeploymentRow
              key={deployment.node.id}
              deploymentId={deployment.node.id}
              status={deployment.node.status}
              isSpinningDown={isSpinningDown}
              onSpinDown={handleSpinDown}
            />
          )
        })}
      </div>
    </div>
  )
}
