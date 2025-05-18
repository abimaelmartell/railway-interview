export const spinDownDeployment = async (deploymentId: string) => {
  const response = await fetch(`/api/spin-down`, {
    method: 'POST',
    body: JSON.stringify({ deploymentId }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to spin down deployment')
  }

  return response.json()
}

export default spinDownDeployment
