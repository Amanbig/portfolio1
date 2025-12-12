"use client";
import React from 'react';
import Link from 'next/link';
import Nav from './Nav';
import MobileNav from './MobileNav';

function Header() {
  const [headerActive, setHeaderActive] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // active state when scrolled down
      setHeaderActive(window.scrollY > 50);
    };

    // add event listener
    window.addEventListener('scroll', handleScroll);
    // remove event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${headerActive ? 'py-4 bg-primary/80 backdrop-blur-md shadow-sm' : 'py-8 xl:py-12 bg-transparent'} sticky top-0 z-50 transition-all duration-300 text-white`}>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href="/">
          <h1 className='text-4xl font-semibold'>
            Amanpreet<span className='text-accent'>.</span>
          </h1>
        </Link>

        <div className='hidden xl:flex items-center gap-8'>
          <Nav />
        </div>

        <div className='xl:hidden'>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
