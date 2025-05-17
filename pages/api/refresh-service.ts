import { fetchService } from '@/lib/gql/fetch-service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { serviceId } = req.body

  if (!serviceId) return res.status(400).json({ error: 'Service ID is required' })

  try {
    const service = await fetchService(serviceId)

    res.status(200).json({ service })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to fetch service', details: error })
  }
}
