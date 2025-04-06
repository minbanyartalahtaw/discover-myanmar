"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X, Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/write-post", label: "Write Post" },
];

export default function TopBar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-6 fixed top-0 z-50 bg-white shadow-sm">
        <div
          className={`transition-opacity ${
            isSearchActive ? "hidden md:block" : "block"
          }`}>
          <Link href="/" className="text-xl font-medium text-gray-700">
            Discover-Myanmar
          </Link>
        </div>

        <div
          className={`absolute left-0 right-0 top-0 z-10 flex h-16 w-full items-center justify-between bg-white px-4 transition-all duration-200 md:px-6 ${
            isSearchActive ? "opacity-100" : "pointer-events-none opacity-0"
          }`}>
          <div className="flex w-full items-center">
            <Search className="mr-2 h-5 w-5 text-gray-500" />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search..."
              className="h-10 w-full flex-1 border-none bg-transparent text-base outline-none placeholder:text-gray-400"
              autoFocus={isSearchActive}
            />
          </div>
          <button
            onClick={() => setIsSearchActive(false)}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
            <X className="h-5 w-5" />
            <span className="sr-only">Close search</span>
          </button>
        </div>

        <nav
          className={`hidden space-x-6 md:flex ${
            isSearchActive ? "opacity-0" : "opacity-100"
          }`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          className={`flex items-center gap-2 ${
            isSearchActive ? "hidden md:flex" : "flex"
          }`}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>

          <button
            onClick={() => setIsSearchActive(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>

      {/*       <div
        ref={mobileMenuRef}
        className={`fixed left-0 top-16 z-50 w-full bg-white shadow-lg transition-all duration-200 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "max-h-[300px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}>
        <div className="flex flex-col p-4 ">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-3 text-base font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      </div> */}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 z-30 flex flex-col bg-white p-4 shadow-lg transition-all duration-200 ease-in-out"
            style={{ height: isMobileMenuOpen ? "270px" : 0 }}
            onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-3 text-base font-medium text-gray-700 hover:text-gray-900">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
