import { useState, useEffect, useCallback } from 'react'

export type AppMode = 'landing' | 'editor' | 'tester'

function getHashMode(): AppMode {
  const hash = window.location.hash.replace('#', '')
  if (hash === 'editor') return 'editor'
  if (hash === 'tester') return 'tester'
  return 'landing'
}

export function useHashRoute() {
  const [mode, setModeState] = useState<AppMode>(getHashMode)

  useEffect(() => {
    const onHashChange = () => setModeState(getHashMode())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const setMode = useCallback((m: AppMode) => {
    window.location.hash = m === 'landing' ? '' : m
    setModeState(m)
  }, [])

  return { mode, setMode }
}
