const toBase64Url = (value) =>
  btoa(value).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')

const fromBase64Url = (value) => {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const padded = `${base64}${'='.repeat((4 - (base64.length % 4)) % 4)}`
  return atob(padded)
}

export const createMockJwt = (user) => {
  const now = Math.floor(Date.now() / 1000)
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + 60 * 60 * 24,
  }
  const encodedHeader = toBase64Url(JSON.stringify(header))
  const encodedPayload = toBase64Url(JSON.stringify(payload))
  const signature = toBase64Url(`${user.id}.${user.role}.atlas-finance`)
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export const decodeMockJwt = (token) => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }
    return JSON.parse(fromBase64Url(parts[1]))
  } catch {
    return null
  }
}

export const validateMockJwt = (token) => {
  const payload = decodeMockJwt(token)
  if (!payload) {
    return null
  }
  const isExpired = payload.exp * 1000 <= Date.now()
  return isExpired ? null : payload
}
