"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut, useSession } from "next-auth/react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const userId = session?.user?.id

  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              SceneConnect
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setIsOpen}
            >
              <span className="font-bold">SceneConnect</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setIsOpen}
                  >
                    {item.name}
                  </MobileLink>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          {session ? (
            <nav className="flex items-center">
              <Button variant="ghost" className="mr-2" asChild>
                <Link href={`/profile/${userId}`}><User className="h-5 w-5"/></Link>
              </Button>
              <Button  onClick={() => signOut()}>
                Sign out
              </Button>
            </nav>
          ) : (
          <nav className="flex items-center">
            <Button variant="ghost" className="mr-2" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </nav>
          )}
        </div>

      </div>
    </header>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={cn(
        className,
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground"
      )}
    >
      {children}
    </Link>
  )
}
