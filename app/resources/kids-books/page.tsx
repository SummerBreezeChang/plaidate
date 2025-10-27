'use client'

import { useState, useEffect } from 'react'
import { Search, BookOpen } from 'lucide-react'

interface Book {
  asin: string
  title: string
  author: string
  image: string
  description: string
  pageCount: string
  ageRange: string
  binding: string
  price: string
  detailPageURL: string
}

export default function KidsBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('children books')
  const [selectedAge, setSelectedAge] = useState<string>('all')
  const [error, setError] = useState('')

  const ageRanges = [
    { label: 'All Ages', value: 'all' },
    { label: 'Ages 5-6', value: '5-6' },
    { label: 'Ages 7-8', value: '7-8' },
    { label: 'Ages 9-10', value: '9-10' },
  ]

  const searchBooks = async (keywords = searchTerm, age = selectedAge) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/amazon-books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: keywords,
          ageRange: age === 'all' ? null : age,
          page: 1
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setBooks(data.books || [])
      } else {
        setError(data.error || 'Failed to fetch books')
      }
    } catch (err: any) {
      setError('Failed to fetch books: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchBooks()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchBooks()
  }

  const handleAgeFilter = (age: string) => {
    setSelectedAge(age)
    searchBooks(searchTerm, age)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header matching your design */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">P</span>
              <span className="text-red-500">l</span>
              <span className="text-yellow-500">a</span>
              <span className="text-blue-500">i</span>
            </h1>
            <nav className="flex gap-6">
              <a href="/explore" className="text-gray-600 hover:text-gray-900">Explore</a>
              <a href="/resources" className="text-gray-900 font-medium">Resources</a>
            </nav>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Join Waitlist
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar matching your design */}
          <aside className="w-64 flex-shrink-0">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <nav className="space-y-2">
              <a href="/resources" className="block text-gray-600 hover:text-gray-900">All Categories</a>
              <a href="/resources/podcasts" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span>🎧</span> Podcasts
              </a>
              <a href="/resources/magazines" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span>📰</span> Magazines
              </a>
              <a href="/resources/kids-books" className="flex items-center gap-2 bg-blue-50 text-gray-900 font-medium px-3 py-2 rounded-lg">
                <span>📚</span> Kids Books
              </a>
              <a href="/resources/parenting-books" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span>📖</span> Parenting Books
              </a>
              <a href="/resources/stem" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span>⚙️</span> STEM Activities
              </a>
              <a href="/resources/cooking" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span>👨‍🍳</span> Cooking Activities
              </a>
              <a href="/resources/diy" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span>🔨</span> DIY Building Activities
              </a>
              <a href="/resources/subscriptions" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span>📦</span> Subscription Boxes
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600 mb-2">{books.length} resources found for <span className="font-medium">all ages</span> in <span className="font-medium">kids books</span></p>
              <h1 className="text-4xl font-bold text-green-800 mb-2">Explore All Resources</h1>
              <p className="text-gray-600">Kids Books • {books.length} resources to grow together</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search kids books..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Age Filters */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Age</h3>
              <div className="flex gap-3 flex-wrap">
                {ageRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handleAgeFilter(range.value)}
                    className={`px-4 py-2 rounded-full border transition ${
                      selectedAge === range.value
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading books...</p>
              </div>
            )}

            {/* Books Grid */}
            {!loading && books.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div
                    key={book.asin}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Book Cover */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-green-50 to-blue-50 relative">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-contain p-4"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <BookOpen className="w-20 h-20 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          Book
                        </span>
                        {book.ageRange !== 'N/A' && (
                          <span className="text-xs text-gray-600">{book.ageRange}</span>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        by {book.author}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-blue-600 font-bold">
                          {book.price}
                        </span>
                        <a
                          href={book.detailPageURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View on Amazon →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && books.length === 0 && !error && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No books found. Try a different search!</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
