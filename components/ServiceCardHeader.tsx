import { Service } from '@/lib/gql/types'
import Image from 'next/image'

const DEFAULT_ICON = 'https://devicons.railway.com/i/github-dark.svg'

type Props = {
  service: Service
}

const ServiceCardHeader = ({ service }: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        <Image src={service.icon ?? DEFAULT_ICON} alt={service.name} width={24} height={24} />

        <h4 className="text-md font-semibold">{service.name}</h4>
      </div>
    </div>
  )
}

export default ServiceCardHeader
