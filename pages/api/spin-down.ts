import { removeDeployment } from '@/lib/gql/remove-deployment'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { deploymentId } = req.body

  if (!deploymentId) return res.status(400).json({ error: 'Deployment ID is required' })

  try {
    await removeDeployment(deploymentId)

    res.status(200).json({ message: 'Deployment deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to delete deployment', details: error })
  }
}
