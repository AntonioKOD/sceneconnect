"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "./SearchBar";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/scenes" },
  { name: "Feed", href: "/feed" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const userId = session?.user?.id || "";
  const userEmail = session?.user?.email || '';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold text-xl text-primary sm:inline-block">SceneMatch</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} pathname={pathname}>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <span className="font-bold text-xl">SceneMatch</span>
              </Link>
              {NAV_ITEMS.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  pathname={pathname}
                  onOpenChange={setIsOpen}
                >
                  {item.name}
                </MobileLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {userId && (
            <div className="relative w-full max-w-sm">
              <SearchBar />
            </div>
          )}
          {session ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/profile/${userId}`} aria-label="User Profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
          {userEmail === 'antonio_kodheli@icloud.com' && (
            <Button variant="secondary" asChild>
              <Link href="/admin">View Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

// Desktop Navigation Link
function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href
          ? "text-primary"
          : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Link
interface MobileLinkProps {
  href: string;
  pathname: string;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function MobileLink({
  href,
  pathname,
  onOpenChange,
  children,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href ? "text-foreground font-medium" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
