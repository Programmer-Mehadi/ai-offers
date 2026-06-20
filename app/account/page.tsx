"use client"

import Link from "next/link"
import {
  BellRing,
  Heart,
  LockKeyhole,
  LogOut,
  MessageSquareText,
  UserRound,
} from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth-provider"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/sections/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AccountPage() {
  const {
    ready,
    isAuthenticated,
    user,
    wishlistIds,
    updateProfile,
    changePassword,
    setNewsletterSubscribed,
    logout,
  } = useAuth()

  const [name, setName] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [savingNewsletter, setSavingNewsletter] = useState(false)

  useEffect(() => {
    setName(user?.name || "")
  }, [user?.name])

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (savingProfile) return

    setSavingProfile(true)
    try {
      await updateProfile({ name })
      toast.success("Profile updated")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update profile"
      )
    } finally {
      setSavingProfile(false)
    }
  }

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (savingPassword) return

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setSavingPassword(true)
    try {
      await changePassword({ currentPassword, newPassword })
      toast.success("Password updated")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to change password"
      )
    } finally {
      setSavingPassword(false)
    }
  }

  async function handleNewsletterToggle() {
    if (!user || savingNewsletter) return

    setSavingNewsletter(true)
    try {
      const subscribed = !user.newsletterSubscribed
      await setNewsletterSubscribed(subscribed)
      toast.success(subscribed ? "Newsletter enabled" : "Newsletter paused")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update newsletter"
      )
    } finally {
      setSavingNewsletter(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-6xl">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-end gap-3 mb-8">
            <div>
              <p className="font-medium text-brand-600 dark:text-brand-400 text-sm uppercase tracking-[0.2em]">
                Account
              </p>
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl tracking-tight">
                Profile, password, wishlist, and newsletter settings.
              </h1>
            </div>
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={logout}
                className="self-start sm:self-auto gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            ) : null}
          </div>

          {!ready ? (
            <Card className="border-border/50">
              <CardContent className="p-6 text-muted-foreground text-sm">
                Loading your account...
              </CardContent>
            </Card>
          ) : !isAuthenticated || !user ? (
            <Card className="border-border/50">
              <CardContent className="space-y-4 p-6">
                <h2 className="font-semibold text-2xl">
                  You are not signed in
                </h2>
                <p className="max-w-2xl text-muted-foreground">
                  Sign in to save offers to your wishlist, update your profile,
                  change your password, and manage newsletter delivery.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/register">Create account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="gap-6 grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <UserRound className="w-5 h-5" />
                      Basic profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="account-name"
                          className="font-medium text-sm"
                        >
                          Display name
                        </label>
                        <Input
                          id="account-name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="account-email"
                          className="font-medium text-sm"
                        >
                          Email
                        </label>
                        <Input
                          id="account-email"
                          value={user.email}
                          readOnly
                          disabled
                        />
                        <p className="text-muted-foreground text-xs">
                          Email is locked after registration in this flow.
                        </p>
                      </div>
                      <Button type="submit" disabled={savingProfile}>
                        {savingProfile ? "Saving..." : "Save profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <LockKeyhole className="w-5 h-5" />
                      Change password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="current-password"
                          className="font-medium text-sm"
                        >
                          Current password
                        </label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(event) =>
                            setCurrentPassword(event.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="next-password"
                          className="font-medium text-sm"
                        >
                          New password
                        </label>
                        <Input
                          id="next-password"
                          type="password"
                          value={newPassword}
                          onChange={(event) =>
                            setNewPassword(event.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="confirm-next-password"
                          className="font-medium text-sm"
                        >
                          Confirm new password
                        </label>
                        <Input
                          id="confirm-next-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          required
                        />
                      </div>
                      <Button type="submit" disabled={savingPassword}>
                        {savingPassword ? "Updating..." : "Update password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BellRing className="w-5 h-5" />
                      Newsletter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center gap-3">
                      <p className="text-muted-foreground text-sm">
                        Weekly deal emails for {user.email}
                      </p>
                      <Badge variant="secondary">
                        {user.newsletterSubscribed ? "On" : "Off"}
                      </Badge>
                    </div>
                    <Button
                      variant={
                        user.newsletterSubscribed ? "outline" : "default"
                      }
                      onClick={handleNewsletterToggle}
                      disabled={savingNewsletter}
                    >
                      {savingNewsletter
                        ? "Saving..."
                        : user.newsletterSubscribed
                          ? "Turn off newsletter"
                          : "Turn on newsletter"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Heart className="w-5 h-5" />
                      Wishlist
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {wishlistIds.length} offer
                      {wishlistIds.length === 1 ? "" : "s"} currently saved to
                      your wishlist.
                    </p>
                    <Button asChild>
                      <Link href="/wishlist">Open wishlist</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MessageSquareText className="w-5 h-5" />
                      Testimonials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      View and manage the testimonials you&apos;ve submitted.
                    </p>
                    <Button asChild>
                      <Link href="/account/testimonials">Open testimonials</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
