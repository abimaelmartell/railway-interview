import Image from 'next/image'
import { mapStatus } from '@/utils/map-status'
import { ServiceEdge } from '@/lib/gql/fetch-services'

type Props = {
  service: ServiceEdge['node']
}

export default function ServiceCard({ service }: Props) {
  const hasRunningDeployment = service.deployments.edges.some(
    (deployment) => deployment.node.status === 'SUCCESS',
  )

  return (
    <div className="border border-gray-200 rounded p-4 bg-gray-50 space-y-3 shadow">
      <div className="flex items-center gap-2 justify-between">
        <h4 className="text-md font-medium">{service.name}</h4>

        <Image
          src={service.icon ?? 'https://devicons.railway.com/i/github-dark.svg'}
          alt={service.name}
          width={80}
          height={80}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {!hasRunningDeployment && (
          <button className="text-xs font-medium px-3 py-1 rounded transition bg-blue-100 text-blue-800 hover:bg-blue-200">
            Spin Up Service
          </button>
        )}

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

              {isRunning && (
                <button
                  className="text-xs font-medium px-3 py-1 rounded transition bg-red-100 text-red-800 hover:bg-red-200"
                  onClick={() =>
                    confirm(`Are you sure you want to spin down service ${service.name}?`)
                  }
                >
                  Spin Down
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
