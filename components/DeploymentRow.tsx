import { mapStatus } from '@/lib/utils'
import LoadingIcon from './LoadingIcon'

const DeploymentRow = ({
  deploymentId,
  status,
  isSpinningDown,
  onSpinDown,
}: {
  deploymentId: string
  status: string
  isSpinningDown: boolean
  onSpinDown: (id: string) => void
}) => {
  const isRunning = status === 'SUCCESS'

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-green-50 border border-green-200 rounded">
      <span className="text-sm font-medium text-green-800">{mapStatus(status)}</span>

      {isRunning && !isSpinningDown ? (
        <button
          className="text-xs font-medium px-3 py-1 rounded transition bg-red-100 text-red-800 hover:bg-red-200"
          onClick={() => onSpinDown(deploymentId)}
        >
          Spin Down
        </button>
      ) : isRunning && isSpinningDown ? (
        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
          <LoadingIcon className="w-4 h-4 animate-spin" />
          Spinning down...
        </span>
      ) : null}
    </div>
  )
}

export default DeploymentRow
