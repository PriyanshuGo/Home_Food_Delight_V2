'use client';

import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';


export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'menu', label: 'Menu', link: '/menu' },
  ];

  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <nav className="bg-white shadow-lg border-b border-saffron/20 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
              <Link href="/">
              </Link>
            </div>
            <div>
              <h1 className="text-lg font-bold text-brown">Home Food Delight</h1>
              <p className="text-xs text-saffron">Authentic Tiffin Service</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  href={item.link}
                  key={item.id}
                  scroll={false}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? 'text-saffron bg-warm-beige'
                    : 'text-brown hover:text-saffron hover:bg-warm-beige/50'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-saffron rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="relative border-saffron text-saffron hover:bg-saffron"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length ? (<Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-saffron"
                >
                  {cartItems.length}
                </Badge>) : null}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-brown"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-warm-beige bg-white">
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link
                    href={item.link}
                    key={item.id}
                    scroll={false}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                      ? 'text-saffron bg-warm-beige font-medium'
                      : 'text-brown hover:text-saffron hover:bg-warm-beige/50'
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
