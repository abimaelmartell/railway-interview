import { useCallback, useState } from 'react'
import { Service } from '@/lib/gql/types'
import spinUpService from '@/lib/api/spin-up'
import spinDownDeployment from '@/lib/api/spin-down'

const useServiceActions = (service: Service, onRefresh: () => void) => {
  const [isSpinningUp, setIsSpinningUp] = useState(false)
  const [isSpinningDown, setIsSpinningDown] = useState(false)

  const handleSpinUp = useCallback(
    async (environmentId: string) => {
      const confirmed = confirm(`Are you sure you want to spin up service ${service.name}?`)
      if (!confirmed) return

      setIsSpinningUp(true)

      try {
        await spinUpService(service.id, environmentId)

        onRefresh()
      } catch (err) {
        console.error('Spin up failed', err)
      } finally {
        setIsSpinningUp(false)
      }
    },
    [service.id, service.name, onRefresh],
  )

  const handleSpinDown = useCallback(
    async (deploymentId: string) => {
      const confirmed = confirm(`Are you sure you want to spin down service ${service.name}?`)
      if (!confirmed) return

      setIsSpinningDown(true)

      try {
        await spinDownDeployment(deploymentId)

        onRefresh()
      } catch (err) {
        console.error('Spin down failed', err)
      } finally {
        setIsSpinningDown(false)
      }
    },
    [service.name, onRefresh],
  )

  return {
    isSpinningUp,
    isSpinningDown,
    handleSpinUp,
    handleSpinDown,
  }
}

export default useServiceActions
