import DeploymentStatus from './DeploymentStatus'

type Props = {
  deploymentId?: string
  status: string
  isSpinningDown?: boolean
  onSpinDown?: (id: string) => void
  isSpinningUp?: boolean
  onSpinUp?: () => void
}

const DeploymentRow = ({
  deploymentId,
  status,
  isSpinningDown,
  onSpinDown,
  isSpinningUp,
  onSpinUp,
}: Props) => {
  const isRunning = status === 'SUCCESS'

  const containerClass = isRunning
    ? 'border-green-200 bg-green-50'
    : 'border-yellow-200 bg-yellow-50'

  const canSpinDown = isRunning && !isSpinningDown

  return (
    <div className={`flex items-center justify-between px-3 py-2 border rounded ${containerClass}`}>
      <DeploymentStatus
        status={status}
        isSpinningDown={isSpinningDown}
        isSpinningUp={isSpinningUp}
      />

      {deploymentId && canSpinDown && (
        <button
          className="text-xs font-medium px-3 py-1 rounded transition bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
          onClick={() => onSpinDown?.(deploymentId)}
        >
          Spin Down
        </button>
      )}

      {!deploymentId && (
        <button
          className="text-xs font-medium px-3 py-1 rounded transition bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
          onClick={() => onSpinUp?.()}
        >
          Spin Up
        </button>
      )}
    </div>
  )
}

export default DeploymentRow
