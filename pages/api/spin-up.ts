import { deployServiceInstance } from '@/lib/gql/deploy-server-instance'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { serviceId, environmentId } = req.body

  if (!serviceId || !environmentId)
    return res.status(400).json({ error: 'Service ID and environment ID are required' })

  try {
    const result = await deployServiceInstance(serviceId, environmentId)

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to deploy service instance', details: error })
  }
}
