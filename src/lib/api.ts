/**
 * Common API utilities to reduce repetition across server actions
 */

export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_PAYLOAD_URL ||
    'http://localhost:3000'
  )
}

export async function apiCall<T>(
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  endpoint: string,
  options?: {
    body?: unknown
    headers?: Record<string, string>
    authToken?: string
  },
): Promise<T> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}${endpoint}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options?.headers,
  }

  if (options?.authToken) {
    headers['Authorization'] = `Bearer ${options.authToken}`
  }

  const response = await fetch(url, {
    method,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  })

  const responseText = await response.text()

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status}`
    try {
      const errorData = JSON.parse(responseText)
      if (errorData.errors?.[0]?.message) {
        errorMessage = errorData.errors[0].message
      } else if (errorData.message) {
        errorMessage = errorData.message
      }
    } catch {
      errorMessage = responseText || errorMessage
    }
    throw new Error(errorMessage)
  }

  try {
    return JSON.parse(responseText) as T
  } catch {
    return responseText as T
  }
}

export async function apiGet<T>(endpoint: string, authToken?: string): Promise<T> {
  return apiCall<T>('GET', endpoint, { authToken })
}

export async function apiPost<T>(endpoint: string, body: unknown, authToken?: string): Promise<T> {
  return apiCall<T>('POST', endpoint, { body, authToken })
}

export async function apiPatch<T>(endpoint: string, body: unknown, authToken?: string): Promise<T> {
  return apiCall<T>('PATCH', endpoint, { body, authToken })
}

export async function apiPut<T>(endpoint: string, body: unknown, authToken?: string): Promise<T> {
  return apiCall<T>('PUT', endpoint, { body, authToken })
}

export async function apiDelete<T>(endpoint: string, authToken?: string): Promise<T> {
  return apiCall<T>('DELETE', endpoint, { authToken })
}
