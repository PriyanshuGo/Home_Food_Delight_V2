// src/hooks/useScrollRestoration.ts
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const useScrollRestoration = () => {
  const pathname = usePathname()

  useEffect(() => {
    const savedY = sessionStorage.getItem(`scroll-${pathname}`)
    if (savedY) {
      window.scrollTo({ top: parseInt(savedY), behavior: 'auto' })
    }
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString())
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])
}

