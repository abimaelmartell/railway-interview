import { ServiceStatus } from '@/lib/gql/types'
import LoadingIcon from './LoadingIcon'
import { DEPLOYMENT_PENDING_STATUSES } from '@/lib/constants'
import { capitalize } from '@/lib/utils'

type Props = {
  status?: ServiceStatus
  isSpinningDown?: boolean
  isSpinningUp?: boolean
}

const DeploymentStatus = ({ status, isSpinningDown, isSpinningUp }: Props) => {
  const isRunning = status === 'SUCCESS'
  const isPending =
    (status && DEPLOYMENT_PENDING_STATUSES.includes(status)) || isSpinningUp || isSpinningDown
  const colorClass = isRunning ? 'text-green-800' : 'text-yellow-800'
  const dotClass = isRunning ? 'bg-green-500' : 'bg-yellow-400'

  let text = status && !isRunning ? capitalize(status) : 'Running'

  if (isSpinningUp) {
    text = 'Spinning up...'
  }

  if (isSpinningDown) {
    text = 'Spinning down...'
  }

  return (
    <span className={`text-sm font-medium flex items-center gap-2 ${colorClass}`}>
      {isPending ? (
        <LoadingIcon className="w-3 h-3 animate-spin" />
      ) : (
        <span className={`w-2 h-2 rounded-full ${dotClass}`} />
      )}
      {text}
    </span>
  )
}

export default DeploymentStatus
