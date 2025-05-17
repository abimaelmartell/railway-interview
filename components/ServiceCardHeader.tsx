import { Service } from '@/lib/gql/types'
import Image from 'next/image'
import LoadingIcon from './LoadingIcon'

const DEFAULT_ICON = 'https://devicons.railway.com/i/github-dark.svg'

type Props = {
  service: Service
  handleRefresh: () => void
  isRefreshing: boolean
  pending: boolean
}

const ServiceCardHeader = ({ service, handleRefresh, isRefreshing, pending }: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        <Image src={service.icon ?? DEFAULT_ICON} alt={service.name} width={24} height={24} />
        <h4 className="text-md font-semibold">{service.name}</h4>
      </div>

      <button
        className="text-xs font-medium flex items-center gap-1 text-gray-500 hover:text-gray-700"
        onClick={handleRefresh}
        disabled={isRefreshing}
        title="Refresh service state"
      >
        {isRefreshing || pending ? (
          <span className="flex items-center gap-1">
            <LoadingIcon className="w-4 h-4 animate-spin" />
            Refreshing
          </span>
        ) : (
          <>
            <LoadingIcon className="w-4 h-4" />
            Refresh
          </>
        )}
      </button>
    </div>
  )
}

export default ServiceCardHeader
