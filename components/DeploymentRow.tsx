import { Deployment } from '@/lib/gql/types'
import DeploymentStatus from './DeploymentStatus'

type Props = {
  deployment?: Deployment
  isSpinningDown?: boolean
  onSpinDown?: (id: string) => void
  isSpinningUp?: boolean
  onSpinUp?: () => void
}

const DeploymentRow = ({
  deployment,
  isSpinningDown,
  onSpinDown,
  isSpinningUp,
  onSpinUp,
}: Props) => {
  const isRunning = deployment?.status === 'SUCCESS'

  const containerClass = isRunning
    ? 'border-green-200 bg-green-50'
    : 'border-yellow-200 bg-yellow-50'

  const canSpinDown = isRunning && !isSpinningDown

  const formattedDate = deployment?.createdAt
    ? new Date(deployment.createdAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null

  return (
    <div className={`flex flex-col px-3 py-2 border rounded ${containerClass}`}>
      <div className="flex items-center justify-between">
        <DeploymentStatus
          status={deployment?.status}
          isSpinningDown={isSpinningDown}
          isSpinningUp={isSpinningUp}
        />

        {deployment?.id && canSpinDown && (
          <button
            className="text-xs font-medium px-3 py-1 rounded transition bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
            onClick={() => onSpinDown?.(deployment.id)}
          >
            Spin Down
          </button>
        )}

        {!deployment?.id && (
          <button
            className="text-xs font-medium px-3 py-1 rounded transition bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
            onClick={() => onSpinUp?.()}
          >
            Spin Up
          </button>
        )}
      </div>

      {isRunning && !isSpinningDown && formattedDate && (
        <p className="text-xs text-gray-500 mt-2">Deployed on {formattedDate}</p>
      )}
    </div>
  )
}

export default DeploymentRow
