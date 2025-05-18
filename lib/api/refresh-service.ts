import { Service } from '../gql/types'

export const refreshService = async (serviceId: string): Promise<{ service: Service }> => {
  const response = await fetch(`/api/refresh-service`, {
    method: 'POST',
    body: JSON.stringify({ serviceId }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to refresh service')
  }

  return response.json()
}

export default refreshService
