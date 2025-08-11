// src/components/ScrollManager.tsx
'use client'

import { useScrollRestoration } from '@/hooks/useScrollRestorationHook'

export default function ScrollManager() {
  useScrollRestoration()
  return null
}