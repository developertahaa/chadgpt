'use client'

import React, { useState, useEffect } from 'react'
import { PaperclipIcon, PlusIcon, ArrowUpIcon, Loader2, XIcon, CopyIcon, CheckIcon } from 'lucide-react'

export default function Component() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = 'black'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5003/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data.response)
    } catch (error) {
      console.error('Error:', error)
      setResult('An error occurred while processing your request.')
    }
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const prompts = [
    "Generate a sticky header",
    "How can I schedule cron jobs?",
    "A function to flatten nested arrays"
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      <header className="relative z-10 flex justify-between items-center p-6 bg-black">
        <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">ChadGPT</div>
        <div className="space-x-2">
          <button
            onClick={() => setIsSignInOpen(true)}
            className="px-4 py-2 text-sm text-white border border-white/20 rounded-md hover:bg-white/10 transition-colors duration-300"
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUpOpen(true)}
            className="px-4 py-2 text-sm bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-md hover:opacity-90 transition-opacity duration-300"
          >
            Sign Up
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">What can I help you ship?</h1>
          <div className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-black text-xs font-semibold px-2 py-1 rounded-full">
            New: Introducing ChadGPT Enterprise and Team plans &gt;
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask ChadGPT a question..."
              className="w-full p-4 pr-24 rounded-full bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors duration-300">
                <PaperclipIcon className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors duration-300">
                <PlusIcon className="w-5 h-5" />
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity duration-300"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowUpIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {prompts.map((prompt, index) => (
            <button
              key={index}
              className="px-4 py-2 text-sm bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors duration-300"
              onClick={() => setQuery(prompt)}
            >
              {prompt} ↗
            </button>
          ))}
        </div>
        {result && (
          <div className="mt-12 w-full max-w-3xl animate-fade-in">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-2xl">
                🤖
              </div>
              <div className="flex-grow">
                <div className="bg-gray-800 rounded-lg p-4 relative">
                  <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{result}</pre>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="relative z-10 flex justify-center flex-wrap gap-6 p-6 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition-colors duration-300">Pricing</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Enterprise</a>
        <a href="#" className="hover:text-white transition-colors duration-300">FAQ</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Legal</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Legacy v0</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Vercel ↗</a>
      </footer>
      {(isSignInOpen || isSignUpOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => {
                setIsSignInOpen(false)
                setIsSignUpOpen(false)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              {isSignInOpen ? 'Sign In' : 'Sign Up'}
            </h2>
            <form className="space-y-4">
              {isSignUpOpen && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" placeholder="John Doe" />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-md hover:opacity-90 transition-opacity duration-300">
                {isSignInOpen ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}