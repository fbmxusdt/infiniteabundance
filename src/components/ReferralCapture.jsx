import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isAddress } from 'viem'

const REFERRER_KEY = 'infinite_abundance_referrer'

// Captures ?ref=0x... from any URL into localStorage.
// Runs on every navigation so a new referral link always overwrites the old one.
export default function ReferralCapture() {
  const location = useLocation()
  useEffect(() => {
    const ref = new URLSearchParams(location.search).get('ref')
    if (ref && isAddress(ref)) {
      localStorage.setItem(REFERRER_KEY, ref)
    }
  }, [location.search])
  return null
}
