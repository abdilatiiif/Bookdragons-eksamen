import 'animate.css'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/ACTIONS/POST/logoutUser'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import * as React from 'react'
import { ArrowDownRight, ShoppingCart, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import Link from 'next/link'

export function NavigationMenuMobile() {
  const router = useRouter()
  const [user, setUser] = React.useState<any>(null)
  const [cartCount, setCartCount] = React.useState(0)

  const checkUser = React.useCallback(() => {
    const cookies = document.cookie.split(';')
    const userCookie = cookies.find((c) => c.trim().startsWith('currentUser='))
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]))
        setUser(userData)
      } catch (e) {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [])

  const updateCartCount = React.useCallback(() => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const items = JSON.parse(cart)
      const total = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(total)
    } else {
      setCartCount(0)
    }
  }, [])

  React.useEffect(() => {
    checkUser()
    updateCartCount()
    const interval = setInterval(checkUser, 1000)
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('cartUpdated', updateCartCount)
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [checkUser, updateCartCount])

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    router.push('/auth/login')
  }

  const navLinks = [
    { title: 'Hjem', href: '/' },
    { title: 'Eventer', href: '/events' },
    { title: 'Artikler', href: '/articles' },
    { title: 'Bøker', href: '/books' },
    { title: 'Om oss', href: '/about' },
    { title: 'Kontakt', href: '/contact' },
  ]
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden fixed z-50 top-4 right-4">
        <Menu size={40} />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <Accordion type="single" collapsible className="w-full px-4" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Menu</AccordionTrigger>
            <AccordionContent className="flex items-center w-full flex-col gap-4 text-balance">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="flex slide-in-right items-center w-full border-2 rounded-lg p-2 bg-[#eab676] transition-all"
                >
                  {link.title}

                  <ArrowDownRight className="ml-2 h-4 w-4" />
                </Link>
              ))}

              {user?.role !== 'admin' && (
                <Link
                  href="/cart"
                  className="flex items-center w-full border-2 rounded-lg p-2 bg-blue-200 transition-all relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Kurv
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {user ? (
                <div className="flex w-full flex-col gap-2 mt-2">
                  <Link
                    href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/bruker'}
                    className="flex items-center w-full border-2 rounded-lg p-2 bg-amber-200 transition-all"
                  >
                    Dashboard
                    <ArrowDownRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Button variant="destructive" onClick={handleLogout} className="w-full">
                    Logg ut
                  </Button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center w-full border-2 rounded-lg p-2 bg-amber-200 transition-all"
                >
                  Logg inn
                  <ArrowDownRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Lukk</Button>
          </SheetClose>

          <p className="text-sm text-center text-muted-foreground mt-4">
            © 2025 BookDragons -Eksamen. All rights reserved. Latif Hassan
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
