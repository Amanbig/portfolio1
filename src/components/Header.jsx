"use client";
import React from 'react';
import Link from 'next/link';
import Nav from './Nav';
import MobileNav from './MobileNav';

function Header() {
  return (
    <header className='container mx-auto py-8 xl:py-12 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href="/">
          <h1 className='text-4xl font-semibold'>
            Amanpreet<span className='text-accent'>.</span>
          </h1>
        </Link>

        <div className='hidden xl:flex items-center gap-8'>
            <Nav/>
        </div>

        <div className='xl:hidden'>
            <MobileNav/>
        </div>
      </div>
    </header>
  );
}

export default Header;
