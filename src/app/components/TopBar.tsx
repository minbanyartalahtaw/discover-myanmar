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

        {/* MacOS-style search overlay */}
        {isSearchActive && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-start justify-center pt-20 z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
              <div className="flex items-center p-4 border-b border-gray-200">
                <Search className="h-5 w-5 text-gray-500 mr-3" />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search..."
                  className="flex-1 text-base bg-transparent border-none outline-none placeholder:text-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchActive(false)}
                  className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5 text-gray-500" />
                  <span className="sr-only">Close search</span>
                </button>
              </div>
              {/* Search results would go here */}
              <div className="p-2">
                {/* Example result items */}
                <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  Recent searches will appear here
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row items-center">
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

          <div className="ml-20 cursor-pointer flex items-center gap-2">
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
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 z-30 flex flex-col p-4 shadow-lg transition-all duration-200 ease-in-out bg-white shadow-black-300 rounded-t-md"
            onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-base font-medium text-gray-700 hover:text-gray-900">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

