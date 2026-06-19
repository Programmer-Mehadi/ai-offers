"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import {
  addFavoriteOffer,
  changePassword as changeUserPassword,
  forgotPassword as requestPasswordReset,
  getFavoriteOffers,
  getProfile,
  loginUser,
  registerUser,
  removeFavoriteOffer,
  resetPassword as submitPasswordReset,
  updateNewsletterPreference,
  updateProfile as saveProfile,
  type AuthResponse,
  type AuthUser,
} from "@/lib/user-api"

type AuthContextValue = {
  ready: boolean
  isAuthenticated: boolean
  user: AuthUser | null
  favoriteIds: string[]
  login: (input: { email: string; password: string }) => Promise<AuthUser>
  register: (input: {
    name?: string
    email: string
    password: string
  }) => Promise<AuthUser>
  logout: () => void
  forgotPassword: (email: string) => Promise<{
    message: string
    resetToken?: string
    expiresAt?: string
  }>
  resetPassword: (input: {
    token: string
    newPassword: string
  }) => Promise<void>
  updateProfile: (input: { name: string }) => Promise<AuthUser>
  changePassword: (input: {
    currentPassword: string
    newPassword: string
  }) => Promise<void>
  setNewsletterSubscribed: (subscribed: boolean) => Promise<AuthUser>
  toggleFavorite: (offerId: string) => Promise<{
    saved: boolean
    synced: boolean
  }>
  removeFavorite: (offerId: string) => Promise<void>
}

type StoredSession = {
  token: string
  user: AuthUser
}

const SESSION_KEY = "offerperks-user-session"
const FAVORITES_KEY = "favorites"

const AuthContext = createContext<AuthContextValue | null>(null)

function readFavoriteIds() {
  if (typeof window === "undefined") return [] as string[]

  try {
    const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]")
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : []
  } catch {
    return []
  }
}

function writeFavoriteIds(favoriteIds: string[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds))
  window.dispatchEvent(new Event("favorites-updated"))
}

function readStoredSession() {
  if (typeof window === "undefined") return null as StoredSession | null

  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || "null")
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.token === "string" &&
      parsed.user &&
      typeof parsed.user === "object"
    ) {
      return parsed as StoredSession
    }
  } catch {}

  return null
}

function writeStoredSession(session: StoredSession | null) {
  if (typeof window === "undefined") return

  if (!session) {
    localStorage.removeItem(SESSION_KEY)
    return
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    setFavoriteIds(readFavoriteIds())

    const session = readStoredSession()
    if (!session) {
      setReady(true)
      return
    }

    void restoreSession(session)
  }, [])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_KEY) {
        setFavoriteIds(readFavoriteIds())
      }

      if (event.key === SESSION_KEY && !event.newValue) {
        setToken(null)
        setUser(null)
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  async function restoreSession(session: StoredSession) {
    try {
      const [profile, favorites] = await Promise.all([
        getProfile(session.token),
        getFavoriteOffers(session.token),
      ])

      setToken(session.token)
      setUser(profile)
      applyFavoriteIds(favorites.map((offer) => offer.id))
      writeStoredSession({ token: session.token, user: profile })
    } catch {
      writeStoredSession(null)
      setToken(null)
      setUser(null)
    } finally {
      setReady(true)
    }
  }

  function applyFavoriteIds(nextFavoriteIds: string[]) {
    setFavoriteIds(nextFavoriteIds)
    writeFavoriteIds(nextFavoriteIds)
  }

  async function completeAuth(response: AuthResponse) {
    setToken(response.access_token)
    setUser(response.user)
    writeStoredSession({ token: response.access_token, user: response.user })

    const localFavorites = readFavoriteIds()
    if (localFavorites.length > 0) {
      await Promise.allSettled(
        localFavorites.map((offerId) =>
          addFavoriteOffer(response.access_token, offerId)
        )
      )
    }

    const favorites = await getFavoriteOffers(response.access_token)
    applyFavoriteIds(favorites.map((offer) => offer.id))

    return response.user
  }

  function logout() {
    setToken(null)
    setUser(null)
    writeStoredSession(null)
  }

  async function login(input: { email: string; password: string }) {
    const response = await loginUser(input)
    return completeAuth(response)
  }

  async function register(input: {
    name?: string
    email: string
    password: string
  }) {
    const response = await registerUser(input)
    return completeAuth(response)
  }

  async function forgotPassword(email: string) {
    return requestPasswordReset(email)
  }

  async function resetPassword(input: { token: string; newPassword: string }) {
    await submitPasswordReset(input)
  }

  async function updateProfile(input: { name: string }) {
    if (!token) {
      throw new Error("You need to sign in first")
    }

    const nextUser = await saveProfile(token, input)
    setUser(nextUser)
    writeStoredSession({ token, user: nextUser })
    return nextUser
  }

  async function changePassword(input: {
    currentPassword: string
    newPassword: string
  }) {
    if (!token) {
      throw new Error("You need to sign in first")
    }

    await changeUserPassword(token, input)
  }

  async function setNewsletterSubscribed(subscribed: boolean) {
    if (!token) {
      throw new Error("You need to sign in first")
    }

    const nextUser = await updateNewsletterPreference(token, subscribed)
    setUser(nextUser)
    writeStoredSession({ token, user: nextUser })
    return nextUser
  }

  async function toggleFavorite(offerId: string) {
    const isSaved = favoriteIds.includes(offerId)

    if (!token) {
      const nextFavoriteIds = isSaved
        ? favoriteIds.filter((id) => id !== offerId)
        : [...favoriteIds, offerId]

      applyFavoriteIds(nextFavoriteIds)
      return { saved: !isSaved, synced: false }
    }

    const offers = isSaved
      ? await removeFavoriteOffer(token, offerId)
      : await addFavoriteOffer(token, offerId)

    applyFavoriteIds(offers.map((offer) => offer.id))
    return { saved: !isSaved, synced: true }
  }

  async function removeFavorite(offerId: string) {
    if (!favoriteIds.includes(offerId)) return
    await toggleFavorite(offerId)
  }

  return (
    <AuthContext.Provider
      value={{
        ready,
        isAuthenticated: Boolean(token && user),
        user,
        favoriteIds,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
        setNewsletterSubscribed,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return value
}
