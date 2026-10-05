import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function getSnapshot() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'light' as const)
}
