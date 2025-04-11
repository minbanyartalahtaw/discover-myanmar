'use client'

import { useEffect, useState } from 'react'

interface SnackBarProps {
  message: string
  duration?: number
  show: boolean
  isError?: boolean
}

const SnackBar = ({ message, duration = 3000, show, isError = false }: SnackBarProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, duration])

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed top-4 right-4 
        ${isError ? 'bg-red-100 border-red-200' : 'bg-green-100 border-green-200'}
        border
        ${isError ? 'text-red-900' : 'text-green-900'}
        px-4 py-2 
        rounded-md 
        shadow-md 
        z-50
        transition-opacity
        duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {message}
    </div>
  )
}

export default SnackBar
