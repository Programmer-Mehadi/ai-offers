import type { Offer } from "@/data/offers"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1"

type ApiEnvelope<T> = {
  success?: boolean
  data?: T
  message?: string | string[]
  error?: string
  statusCode?: number
}

export type AuthUser = {
  id: string
  email: string
  name?: string
  role: string
  newsletterSubscribed: boolean
}

export type AuthResponse = {
  access_token: string
  user: AuthUser
}

export type ForgotPasswordResponse = {
  message: string
  resetToken?: string
  expiresAt?: string
}

function mapOffer(raw: Record<string, unknown>) {
  return { ...raw, id: raw.slug } as Offer
}

async function readJson(response: Response) {
  try {
    return (await response.json()) as ApiEnvelope<unknown>
  } catch {
    return null
  }
}

function getErrorMessage(
  payload: ApiEnvelope<unknown> | null,
  fallback: string
) {
  const message = payload?.message

  if (Array.isArray(message) && message.length > 0) {
    return message.join(" ")
  }

  if (typeof message === "string" && message.trim()) {
    return message
  }

  if (typeof payload?.error === "string" && payload.error.trim()) {
    return payload.error
  }

  return fallback
}

async function apiRequest<T>(
  path: string,
  init?: RequestInit,
  token?: string
): Promise<T> {
  const headers = new Headers(init?.headers)

  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json")
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  })

  const payload = await readJson(response)

  if (!response.ok) {
    throw new Error(
      getErrorMessage(payload, `Request failed with status ${response.status}`)
    )
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T
  }

  return payload as T
}

export function subscribeToNewsletter(email: string) {
  return apiRequest<{ email: string; subscribed: boolean }>(
    "/newsletter/subscribe",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    }
  )
}

export function unsubscribeFromNewsletter(email: string) {
  return apiRequest<{ email: string; subscribed: boolean }>(
    "/newsletter/unsubscribe",
    {
      method: "DELETE",
      body: JSON.stringify({ email }),
    }
  )
}

export function registerUser(input: {
  name?: string
  email: string
  password: string
}) {
  return apiRequest<AuthResponse>("/auth/user/register", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function loginUser(input: { email: string; password: string }) {
  return apiRequest<AuthResponse>("/auth/user/login", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function forgotPassword(email: string) {
  return apiRequest<ForgotPasswordResponse>("/auth/user/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
}

export function resetPassword(input: { token: string; newPassword: string }) {
  return apiRequest<{ message: string }>("/auth/user/reset-password", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function getProfile(token: string) {
  return apiRequest<AuthUser>("/user/profile", undefined, token)
}

export function updateProfile(token: string, input: { name: string }) {
  return apiRequest<AuthUser>(
    "/user/profile",
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token
  )
}

export function changePassword(
  token: string,
  input: { currentPassword: string; newPassword: string }
) {
  return apiRequest<{ message: string }>(
    "/user/password",
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token
  )
}

export function updateNewsletterPreference(token: string, subscribed: boolean) {
  return apiRequest<AuthUser>(
    "/user/newsletter",
    {
      method: "PATCH",
      body: JSON.stringify({ subscribed }),
    },
    token
  )
}

// --- Wishlist (saved offers) ---

export async function getWishlist(token: string) {
  const raw = await apiRequest<Record<string, unknown>[]>(
    "/user/favorites",
    undefined,
    token
  )
  return raw.map(mapOffer)
}

export async function addWishlist(token: string, offerId: string) {
  const raw = await apiRequest<Record<string, unknown>[]>(
    "/user/favorites",
    {
      method: "POST",
      body: JSON.stringify({ offerId }),
    },
    token
  )
  return raw.map(mapOffer)
}

export async function removeWishlist(token: string, offerId: string) {
  const raw = await apiRequest<Record<string, unknown>[]>(
    `/user/favorites/${offerId}`,
    {
      method: "DELETE",
    },
    token
  )
  return raw.map(mapOffer)
}

// --- Claimed offers ---

export async function getClaimedOffers(token: string) {
  const raw = await apiRequest<Record<string, unknown>[]>(
    "/user/claimed",
    undefined,
    token
  )
  return raw.map(mapOffer)
}

export async function addClaimedOffer(token: string, offerId: string) {
  const raw = await apiRequest<Record<string, unknown>[]>(
    "/user/claimed",
    {
      method: "POST",
      body: JSON.stringify({ offerId }),
    },
    token
  )
  return raw.map(mapOffer)
}

export async function removeClaimedOffer(token: string, offerId: string) {
  const raw = await apiRequest<Record<string, unknown>[]>(
    `/user/claimed/${offerId}`,
    {
      method: "DELETE",
    },
    token
  )
  return raw.map(mapOffer)
}

// --- Wishlist suggestions (feature requests) ---

export type WishlistSuggestion = {
  _id: string
  title: string
  description?: string
  votes: number
  createdAt: string
}

export function getSuggestions() {
  return apiRequest<WishlistSuggestion[]>("/wishlist")
}

export function createSuggestion(input: {
  title: string
  description?: string
}) {
  return apiRequest<WishlistSuggestion>("/wishlist", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function voteSuggestion(id: string) {
  return apiRequest<WishlistSuggestion>(`/wishlist/${id}/vote`, {
    method: "POST",
  })
}

export function deleteSuggestion(token: string, id: string) {
  return apiRequest<{ message: string }>(
    `/wishlist/${id}`,
    { method: "DELETE" },
    token
  )
}
