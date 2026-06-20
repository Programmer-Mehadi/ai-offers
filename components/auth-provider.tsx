"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import {
  addWishlist as apiAddWishlist,
  changePassword as changeUserPassword,
  forgotPassword as requestPasswordReset,
  getWishlist as apiGetWishlist,
  getClaimedOffers,
  getProfile,
  loginUser,
  registerUser,
  removeWishlist as apiRemoveWishlist,
  addClaimedOffer,
  removeClaimedOffer,
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
  wishlistIds: string[]
  claimedIds: string[]
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
  toggleWishlist: (offerId: string) => Promise<{
    saved: boolean
  }>
  removeWishlist: (offerId: string) => Promise<void>
  toggleClaimed: (offerId: string) => Promise<{
    claimed: boolean
  }>
}

type StoredSession = {
  token: string
  user: AuthUser
}

const SESSION_KEY = "offerperks-user-session"

const AuthContext = createContext<AuthContextValue | null>(null)

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
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [claimedIds, setClaimedIds] = useState<string[]>([])

  useEffect(() => {
    const session = readStoredSession()
    if (!session) {
      setReady(true)
      return
    }

    void restoreSession(session)
  }, [])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === SESSION_KEY && !event.newValue) {
        setToken(null)
        setUser(null)
        setWishlistIds([])
        setClaimedIds([])
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  async function restoreSession(session: StoredSession) {
    try {
      const [profile, wishlist, claimed] = await Promise.all([
        getProfile(session.token),
        apiGetWishlist(session.token),
        getClaimedOffers(session.token),
      ])

      setToken(session.token)
      setUser(profile)
      setWishlistIds(wishlist.map((offer) => offer.id))
      setClaimedIds(claimed.map((offer) => offer.id))
      writeStoredSession({ token: session.token, user: profile })
    } catch {
      writeStoredSession(null)
      setToken(null)
      setUser(null)
    } finally {
      setReady(true)
    }
  }

  async function completeAuth(response: AuthResponse) {
    setToken(response.access_token)
    setUser(response.user)
    writeStoredSession({ token: response.access_token, user: response.user })

    const [wishlist, claimed] = await Promise.all([
      apiGetWishlist(response.access_token),
      getClaimedOffers(response.access_token),
    ])
    setWishlistIds(wishlist.map((offer) => offer.id))
    setClaimedIds(claimed.map((offer) => offer.id))

    return response.user
  }

  function logout() {
    setToken(null)
    setUser(null)
    setWishlistIds([])
    setClaimedIds([])
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

  async function toggleWishlist(offerId: string) {
    if (!token) {
      throw new Error("Sign in to save offers to your wishlist")
    }

    const isSaved = wishlistIds.includes(offerId)
    const offers = isSaved
      ? await apiRemoveWishlist(token, offerId)
      : await apiAddWishlist(token, offerId)

    setWishlistIds(offers.map((offer) => offer.id))
    return { saved: !isSaved }
  }

  async function removeWishlist(offerId: string) {
    if (!wishlistIds.includes(offerId) || !token) return
    const offers = await apiRemoveWishlist(token, offerId)
    setWishlistIds(offers.map((offer) => offer.id))
  }

  async function toggleClaimed(offerId: string) {
    if (!token) {
      throw new Error("Sign in to mark offers as claimed")
    }

    const isClaimed = claimedIds.includes(offerId)
    const offers = isClaimed
      ? await removeClaimedOffer(token, offerId)
      : await addClaimedOffer(token, offerId)

    setClaimedIds(offers.map((offer) => offer.id))
    return { claimed: !isClaimed }
  }

  return (
    <AuthContext.Provider
      value={{
        ready,
        isAuthenticated: Boolean(token && user),
        user,
        wishlistIds,
        claimedIds,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
        setNewsletterSubscribed,
        toggleWishlist,
        removeWishlist,
        toggleClaimed,
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
