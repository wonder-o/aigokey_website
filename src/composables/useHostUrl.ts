/**
 * Constructs login/register URLs based on the host (parent) domain.
 * When running inside an iframe, reads the parent origin;
 * otherwise falls back to the current window origin.
 */
export function useHostUrl() {
  function getHostOrigin(): string {
    if (typeof document === 'undefined') return ''
    try {
      // Try to read the parent's origin when in an iframe
      if (window.parent !== window) {
        return window.parent.location.origin
      }
    } catch {
      // Cross-origin iframe: fall back to document.referrer or current origin
      if (document.referrer) {
        const url = new URL(document.referrer)
        return url.origin
      }
    }
    return window.location.origin
  }

  const hostOrigin = getHostOrigin()

  function buildUrl(path: string): string {
    return `${hostOrigin}${path}`
  }

  const loginUrl = buildUrl('/login')
  const registerUrl = buildUrl('/register')

  return { hostOrigin, loginUrl, registerUrl, buildUrl }
}
