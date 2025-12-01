import 'animate.css'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import * as React from 'react'
import { ArrowDownRight } from 'lucide-react'

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
import { Menu } from 'lucide-react'

import Link from 'next/link'
import { DarkMode } from '../DarkMode'
import { Input } from '../ui/input'

export function NavigationMenuMobile() {
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

        <Accordion type="single" collapsible className="w-full px-4 " defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Søk</AccordionTrigger>
            <AccordionContent className="flex items-center w-full flex-col gap-4 text-balance">
              <Input
                placeholder="søk etter din bok.."
                className="border-2 rounded-3xl outline-1 bg-green-200"
              />
            </AccordionContent>
          </AccordionItem>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter>
          <DarkMode />
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
