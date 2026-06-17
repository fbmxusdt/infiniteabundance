import { useEffect, useState } from 'react'

export function useCountdown(endsAt) {
  const [formatted, setFormatted] = useState('…')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000)
      const remaining = Math.max(0, endsAt - now)
      setIsActive(remaining > 0)

      if (remaining <= 0) {
        setFormatted('Ready ✓')
        return
      }

      const hrs = Math.floor(remaining / 3600)
      const mins = Math.floor((remaining % 3600) / 60)
      const secs = remaining % 60

      if (hrs > 0) {
        setFormatted(`${hrs}h ${mins}m`)
      } else if (mins > 0) {
        setFormatted(`${mins}m ${secs}s`)
      } else {
        setFormatted(`${secs}s`)
      }
    }

    update()
    const int = setInterval(update, 1000)
    return () => clearInterval(int)
  }, [endsAt])

  return { formatted, isActive }
}
