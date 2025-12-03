// Deprecated: this hook is no longer used.
// Keeping a minimal stub to avoid accidental imports breaking the build.

export interface CurrentUser {
  id: string | number
  email: string
  name?: string
  phone?: string
  address?: string
  role?: string
}

export function useCurrentUser(): {
  user: CurrentUser | null
  loading: boolean
  error: string | null
} {
  return { user: null, loading: false, error: null }
}
