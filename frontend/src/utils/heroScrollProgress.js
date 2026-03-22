/**
 * Scroll progress 0..1 through a section (same math as RobotGuide).
 * Before the section: 0. After the section (fully scrolled past): 1.
 */
export function getScrollProgressThroughSection(sectionElement) {
  if (typeof window === 'undefined' || !sectionElement) return 0
  const scrollY = window.scrollY
  const vh = window.innerHeight
  const top = sectionElement.offsetTop
  const height = sectionElement.offsetHeight || 1
  const bottom = top + height

  if (scrollY + vh <= top) return 0
  if (scrollY >= bottom) return 1

  const denom = Math.max(1, height - vh)
  return Math.max(0, Math.min(1, (scrollY - top) / denom))
}

/**
 * Hero (#section-hero) progress — use for copy timing and reveal logic.
 */
export function getHeroProgress() {
  if (typeof document === 'undefined') return 0
  const el = document.getElementById('section-hero')
  return getScrollProgressThroughSection(el)
}

/** Same easing as RobotGuide hero drive — path midpoint at te = 0.5 */
export function easeInOutCubic(t) {
  const c = Math.max(0, Math.min(1, t))
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}

/** 0..1 along hero path (matches RobotGuide `te`) — use for copy vs robot position */
export function getHeroDriveT() {
  return easeInOutCubic(getHeroProgress())
}
