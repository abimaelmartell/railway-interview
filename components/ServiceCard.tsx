import { useCallback, useState } from 'react'
import Image from 'next/image'

import { DEPLOYMENT_PENDING_STATUSES } from '@/lib/constants'
import { mapStatus } from '@/lib/utils'
import { Service, Environment } from '@/lib/gql/types'

type Props = {
  initialService: Service
  environment: Environment
}

const DEFAULT_ICON = 'https://devicons.railway.com/i/github-dark.svg'

export default function ServiceCard({ initialService, environment }: Props) {
  const [isSpinningDown, setIsSpinningDown] = useState(false)
  const [isSpinningUp, setIsSpinningUp] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [service, setService] = useState<Service>(initialService)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)

    const response = await fetch(`/api/refresh-service`, {
      method: 'POST',
      body: JSON.stringify({ serviceId: service.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Failed to refresh service')
      setIsRefreshing(false)
      return
    }

    const data = await response.json()
    setService(data.service)
    setIsRefreshing(false)
  }, [service.id])

  const handleSpinDown = async (deploymentId: string) => {
    const confirmed = confirm(`Are you sure you want to spin down service ${service.name}?`)
    if (!confirmed) return

    setIsSpinningDown(true)

    await fetch(`/api/spin-down`, {
      method: 'POST',
      body: JSON.stringify({ deploymentId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // wait a bit to get actual state
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSpinningDown(false)
    handleRefresh()
  }

  const handleSpinUp = async (serviceId: string) => {
    const confirmed = confirm(`Are you sure you want to spin up service ${service.name}?`)
    if (!confirmed) return

    setIsSpinningUp(true)

    await fetch(`/api/spin-up`, {
      method: 'POST',
      body: JSON.stringify({ serviceId, environmentId: environment.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // wait a bit to get actual state
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSpinningUp(false)
    handleRefresh()
  }

  const hasRunningDeployment = service.deployments.edges.some(
    (deployment) => deployment.node.status === 'SUCCESS',
  )

  const hasPendingDeployment = service.deployments.edges.some((deployment) =>
    DEPLOYMENT_PENDING_STATUSES.includes(deployment.node.status),
  )

  return (
    <div className="border border-gray-200 rounded p-4 bg-gray-50 space-y-3 shadow" onClick={handleRefresh}>
      <div className="flex items-center gap-2 justify-between">
        <h4 className="text-md font-medium">{service.name}</h4>

        <Image src={service.icon ?? DEFAULT_ICON} alt={service.name} width={80} height={80} />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {!hasRunningDeployment && !isSpinningUp && !hasPendingDeployment && (
          <button
            className="text-xs font-medium px-3 py-1 rounded transition bg-blue-100 text-blue-800 hover:bg-blue-200"
            onClick={() => handleSpinUp(service.id)}
          >
            Spin Up Service
          </button>
        )}

        {isSpinningUp && <span className="text-xs font-medium text-gray-500">Spinning up...</span>}

        {service.deployments.edges.map((deployment) => {
          const isRunning = deployment.node.status === 'SUCCESS'

          return (
            <div
              key={deployment.node.id}
              className="flex items-center justify-between px-3 py-2 bg-green-50 border border-green-200 rounded"
            >
              <span className="text-sm font-medium text-green-800">
                {mapStatus(deployment.node.status)}
              </span>

              {isRunning && !isSpinningDown && (
                <button
                  className="text-xs font-medium px-3 py-1 rounded transition bg-red-100 text-red-800 hover:bg-red-200"
                  onClick={() => handleSpinDown(deployment.node.id)}
                >
                  Spin Down
                </button>
              )}

              {isSpinningDown && (
                <span className="text-xs font-medium text-gray-500">Spinning down...</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
