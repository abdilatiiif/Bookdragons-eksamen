'use client'

import * as React from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Input } from '@/components/ui/input'
import { Car, Flame, Plane, Sailboat } from 'lucide-react'
import SearchInputNav from './SearchInputNav'

export function NavigationDesktop() {
  return (
    <NavigationMenu className="  max-w-7xl pl-2 rounded-2xl hidden md:flex ">
      <NavigationMenuList className="">
        <NavigationMenuItem className=" md:block  ml-4 p-2 hover:bg-yellow-600 rounded-full transition-colors cursor-pointer">
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
        </NavigationMenuItem>
        <NavigationMenuItem className=" md:block">
          <NavigationMenuTrigger>
            <Link href="/books">Bøker</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem className=" md:block">
          <NavigationMenuTrigger>
            {' '}
            <Link href="/ikkenodvendig">Eventer</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem className=" md:block">
          <NavigationMenuTrigger>
            <Link href="/ikkenodvendig">Artikkler</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem className=" md:block">
          <NavigationMenuTrigger>Mer</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/ikkenodvendig">
                    Om Oss
                    <div className="text-muted-foreground">
                      Lær mer om BookDragons, vårt team og vår lidenskap for bøker.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/ikkenodvendig">
                    Kontakt & Support
                    <div className="text-muted-foreground">
                      Kontakt oss for spørsmål, support og hjelp med våre tjenester.
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link href="/auth/login">
                    Logg inn/registrer
                    <div className="text-muted-foreground p-2 rounded-2xl bg-green-400">
                      Få tilgang til din konto for å administrere bestillinger
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <SearchInputNav />
    </NavigationMenu>
  )
}
