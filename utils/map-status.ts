import { RailwayServiceStatus } from '@/lib/gql/fetch-services'

export function mapStatus(status: RailwayServiceStatus) {
  switch (status) {
    case 'SUCCESS':
      return '🟢  Running'
    case 'BUILDING':
      return '🟡  Building'
    case 'DEPLOYING':
      return '🟡  Deploying'
    default:
      return `🤷‍♂️  ${status}`
  }
}
