export const spinUpService = async (serviceId: string, environmentId: string) => {
  const response = await fetch(`/api/spin-up`, {
    method: 'POST',
    body: JSON.stringify({ serviceId, environmentId }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to spin up service')
  }

  return response.json()
}

export default spinUpService
