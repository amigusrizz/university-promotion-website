'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-accent">
            University
          </Link>
          
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <Link href="/campus-tour" className="hover:text-accent transition">Campus Tour</Link>
            <Link href="/academics" className="hover:text-accent transition">Academics</Link>
            <Link href="/admissions" className="hover:text-accent transition">Admissions</Link>
            <Link href="/joke-generator" className="hover:text-accent transition">Jokes</Link>
            <Link href="/contact" className="hover:text-accent transition">Contact</Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <Link href="/campus-tour" className="hover:text-accent transition">Campus Tour</Link>
            <Link href="/academics" className="hover:text-accent transition">Academics</Link>
            <Link href="/admissions" className="hover:text-accent transition">Admissions</Link>
            <Link href="/joke-generator" className="hover:text-accent transition">Jokes</Link>
            <Link href="/contact" className="hover:text-accent transition">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
