'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ToggleTheme from './toggle-theme';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavLink {
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'About', href: '/about' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Contact', href: '/contact' },
];

function AppHeader() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-16 flex justify-between items-center px-6 md:px-12 lg:px-24">
        <Link className="flex items-center gap-2" href="/" onClick={closeMenu}>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <h2 className="font-semibold text-xl">KeyLabs</h2>
        </Link>

        {isMobile && (
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <ShoppingCart size={24} />
            </Link>
            <button
              id="mobile-menu-toggle"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-1 rounded-md transition-colors hover:bg-accent"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        )}

        {!isMobile && (
          <>
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href}>{link.title}</Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
              <ToggleTheme />
              <Link href="/cart">
                <ShoppingCart size={24} />
              </Link>
              {status === 'authenticated' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      <AvatarImage src={session.user?.image || ''} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 mt-2">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer w-full">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => signOut()} 
                      className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/50"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/auth/signup"
                  className="text-primary dark:text-amber-500"
                >
                  SignUp
                </Link>
              )}
            </div>
          </>
        )}
      </header>

      {isMobile && (
        <>
          <div
            id="mobile-menu-backdrop"
            aria-hidden="true"
            onClick={closeMenu}
            className={[
              'fixed inset-0 z-40',
              'bg-background/30 backdrop-blur-sm',
              'transition-opacity duration-300 ease-in-out',
              isMenuOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none',
            ].join(' ')}
          />

          <nav
            id="mobile-menu-drawer"
            aria-label="Mobile navigation"
            className={[
              'fixed top-16 right-0 bottom-0 z-50',
              'w-3/4 max-w-xs',
              'bg-background border-l border-border',
              'flex flex-col gap-1 px-6 py-8',
              'shadow-2xl',
              'transition-transform duration-300 ease-in-out',
              isMenuOpen ? 'translate-x-0' : 'translate-x-full',
            ].join(' ')}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-lg font-medium py-3 border-b border-border/50 hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}

            <div className="mt-auto border-t border-border/50 pt-6 flex flex-col gap-4">
              {status === 'authenticated' ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image || ''} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {getInitials(session.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{session.user?.name}</span>
                        <span className="text-xs text-muted-foreground truncate w-32">{session.user?.email}</span>
                      </div>
                    </div>
                    <ToggleTheme />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <Link href="/profile" onClick={closeMenu} className="text-lg font-medium hover:text-primary">Profile</Link>
                    <Link href="/settings" onClick={closeMenu} className="text-lg font-medium hover:text-primary">Settings</Link>
                    <button onClick={() => { closeMenu(); signOut(); }} className="text-left text-lg font-medium text-red-500">Sign Out</button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <Link
                    href="/auth/signup"
                    onClick={closeMenu}
                    className="text-primary text-lg dark:text-amber-500 font-medium hover:underline"
                  >
                    SignUp
                  </Link>
                  <ToggleTheme />
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default AppHeader;
