'use client'

import { useState, useEffect } from 'react'
import { Search, BookOpen, Star } from 'lucide-react'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('children books')
  const [error, setError] = useState('')

  const searchBooks = async (keywords = searchTerm) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/amazon-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: keywords,
          page: 1
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setBooks(data.books || [])
      } else {
        setError(data.error || 'Failed to fetch books')
      }
    } catch (err) {
      setError('Failed to fetch books: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchBooks()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    searchBooks()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2 flex items-center justify-center gap-2">
            <BookOpen className="w-10 h-10" />
            Plaideate Kids Books
          </h1>
          <p className="text-purple-600">Find amazing books for children</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for kids books..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Filters */}
        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          {['picture books', 'early readers', 'chapter books', 'young adult'].map(category => (
            <button
              key={category}
              onClick={() => {
                setSearchTerm(category)
                searchBooks(category)
              }}
              className="px-4 py-2 bg-white rounded-full text-purple-700 border border-purple-200 hover:bg-purple-100 transition capitalize"
            >
              {category}
            </button>
          ))}
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-purple-600">Loading books...</p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <div
                key={book.asin || index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Book Cover */}
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 relative">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <BookOpen className="w-20 h-20 text-purple-300" />
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {book.author || 'Unknown'}
                  </p>
                  
                  {book.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {book.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-purple-600 font-bold">
                      {book.price || 'N/A'}
                    </span>
                    {book.detailPageURL && (
                      
                        href={book.detailPageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        View on Amazon →
                      </a>
                    )}
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
            <p className="text-gray-600">No books found. Try searching!</p>
          </div>
        )}
      </div>
    </div>
  )
}
