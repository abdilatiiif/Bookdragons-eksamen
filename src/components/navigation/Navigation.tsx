'use client'

import { Button } from '@/components/ui/button'
import { Menu, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/ACTIONS/POST/logoutUser'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'

import { NavigationDesktop } from './NavigationDesktop'

import { DarkMode } from '../DarkMode'
import { NavigationMenuMobile } from './NavigationMenuMobile'

export function Navigation() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  const checkUser = () => {
    const cookies = document.cookie.split(';')
    const userCookie = cookies.find((c) => c.trim().startsWith('currentUser='))
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]))
        setUser(userData)
      } catch (e) {
        console.error('Failed to parse user cookie')
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    checkUser()

    // Check user on interval (to catch cookie changes)
    const interval = setInterval(checkUser, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    router.push('/auth/login')
  }
  return (
    <div className="flex allPages fixed z-50 flex-row items-center justify-between h-20 w-full">
      {/** desktop  */}

      <NavigationDesktop />

      <div className="z-50 fixed ml-4 md:hidden">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
          </svg>
        </Link>
      </div>

      <div className="z-10 hidden md:flex items-center gap-2 pr-4">
        <DarkMode />
        {user ? (
          <div className="flex items-center gap-2">
            <Link href="/dashboard/bruker">
              <Button variant="outline" className="gap-2">
                <User className="w-4 h-4" />
                {user.name || user.email}
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
      {/** mobile  */}

      <NavigationMenuMobile />
    </div>
  )
}
