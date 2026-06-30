/**
 * Constructs login/register URLs based on the host (parent) domain.
 * - Normal browser (non-iframe): if host starts with www., replace with llm.
 *   Otherwise keep the original host and prepend llm. as subdomain.
 * - iframe: read parent/referrer domain, same rule.
 */
export function useHostUrl() {
  function getHostOrigin(): string {
    if (typeof document === 'undefined') return ''
    try {
      // iframe: read parent's origin
      if (window.parent !== window) {
        return window.parent.location.origin
      }
    } catch {
      // Cross-origin iframe: fall back to referrer
      if (document.referrer) {
        const url = new URL(document.referrer)
        return url.origin
      }
    }
    return window.location.origin
  }

  /**
   * Convert a host to llm subdomain.
   * e.g. https://www.example.com  → https://llm.example.com
   *       https://example.com      → https://llm.example.com
   *       https://llm.example.com  → https://llm.example.com (no change)
   */
  function toLlmOrigin(origin: string): string {
    try {
      const url = new URL(origin)
      const host = url.hostname

      // Already llm. subdomain
      if (host.startsWith('llm.')) return origin

      // www. → replace with llm.
      if (host.startsWith('www.')) {
        url.hostname = 'llm.' + host.slice(4)
      } else {
        url.hostname = 'llm.' + host
      }
      return url.origin
    } catch {
      return origin
    }
  }

  const hostOrigin = getHostOrigin()
  const llmOrigin = toLlmOrigin(hostOrigin)

  function buildUrl(path: string): string {
    return `${llmOrigin}${path}`
  }

  const loginUrl = buildUrl('/login')
  const registerUrl = buildUrl('/register')

  return { hostOrigin, llmOrigin, loginUrl, registerUrl, buildUrl }
}
