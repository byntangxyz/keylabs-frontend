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
              <Link
                href="/auth/signup"
                className="text-primary dark:text-amber-500"
              >
                SignUp
              </Link>
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

            <div className="mt-auto flex justify-between items-center gap-3 pt-6">
              <Link
                href="/auth/signup"
                onClick={closeMenu}
                className="text-primary text-lg dark:text-amber-500 font-medium hover:underline"
              >
                SignUp
              </Link>
              <ToggleTheme />
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default AppHeader;
