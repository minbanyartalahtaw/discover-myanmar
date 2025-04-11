"use client"

import { useState } from "react"
import { Mail } from 'lucide-react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setShowToast(true)
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
      
      // Hide toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000)
    }, 1500)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-100">
      <div className="relative w-[95%] max-w-[500px] mx-auto px-4 sm:px-0">
        {/* Toast notification */}
        {showToast && (
          <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 shadow-md transition-all duration-300 max-w-xs z-50">
            <div className="font-medium">Message sent!</div>
            <div className="text-sm">Thank you for reaching out. I'll get back to you soon.</div>
          </div>
        )}
        
        {/* Contact card */}
        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <Mail className="h-6 w-10" />
              <span>Contact Me</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                  Name
                </label>
                <input 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="How can I help you?" 
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isSubmitting 
                    ? "bg-neutral-400 cursor-not-allowed" 
                    : "bg-black hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                } transition-colors duration-200`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
