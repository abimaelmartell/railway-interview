import { useEffect, useRef } from 'react'

const useServicePolling = (
  shouldPoll: boolean,
  onPoll: () => void,
  intervalMs = 5000,
  maxAttempts = 30,
) => {
  const attemptRef = useRef(0)

  useEffect(() => {
    if (!shouldPoll) return

    const interval = setInterval(() => {
      if (attemptRef.current >= maxAttempts) {
        clearInterval(interval)
        return
      }

      attemptRef.current += 1
      onPoll()
    }, intervalMs)

    return () => {
      clearInterval(interval)
      attemptRef.current = 0
    }
  }, [shouldPoll, onPoll, intervalMs, maxAttempts])
}

export default useServicePolling
