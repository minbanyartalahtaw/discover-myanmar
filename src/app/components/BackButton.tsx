'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  className?: string
}

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className={`fixed top-4 left-4 z-50 bg-white  cursor-pointer inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors shadow-md ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 text-gray-600" />
    </button>
  )
}
