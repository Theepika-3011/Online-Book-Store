import React, { useState, useMemo } from 'react';
import { Book } from '../types';
import BookCard from './BookCard';
import { Search, SlidersHorizontal, BookOpen, AlertCircle } from 'lucide-react';

interface BookGridProps {
  books: Book[];
  onViewDetails: (book: Book) => void;
  onAddToCart: (book: Book, e: React.MouseEvent) => void;
  onSelectAiGenre: (prompt: string) => void;
}

export default function BookGrid({ books, onViewDetails, onAddToCart, onSelectAiGenre }: BookGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<number>(3000);

  // Derive unique genres
  const genres = useMemo(() => {
    const list = new Set(books.map((b) => b.genre));
    return ['All', ...Array.from(list)];
  }, [books]);

  // Filtering & Sorting Logic
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    // 1. Text Search across Title, Author, Description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    // 2. Genre Filter
    if (selectedGenre !== 'All') {
      result = result.filter((b) => b.genre === selectedGenre);
    }

    // 3. Price Capsule Filter
    result = result.filter((b) => b.price <= priceRange);

    // 4. Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [books, searchQuery, selectedGenre, sortBy, priceRange]);

  return (
    <div className="flex flex-col gap-6" id="book-grid-root">
      {/* Interactive Command & Search Center */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white border border-orange-100 p-5 rounded-2xl shadow-sm">
        {/* Search Field */}
        <div className="relative w-full lg:max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-orange-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            id="book-main-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search classics, science fiction, historical secrets..."
            className="w-full bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-850 placeholder-stone-400 font-sans transition-all"
          />
        </div>

        {/* Sorting Dropdown & Interactive controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center text-orange-650 text-xs font-mono">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </div>
          <select
            id="book-sort-selector"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-orange-200 rounded-xl px-3 py-2 text-xs font-mono text-orange-950 focus:border-orange-400 focus:outline-none cursor-pointer"
          >
            <option value="featured">Default (Featured)</option>
            <option value="rating">Highest Rated (★ 5.0)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>

          {/* Interactive Price filter */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-orange-50/50 rounded-xl border border-orange-100 max-w-sm ml-auto">
            <span className="text-[10px] uppercase tracking-wider text-orange-700 font-mono">Max Price:</span>
            <input
              id="book-price-slider"
              type="range"
              min="1000"
              max="3000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="accent-orange-500 h-1 cursor-ew-resize bg-orange-150 rounded-lg appearance-none w-24"
            />
            <span className="text-xs font-mono text-orange-950 font-semibold">₹{priceRange.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Genre Filter Pill Row */}
      <div className="flex flex-wrap gap-2 py-1 items-center justify-between border-b border-orange-100 pb-4">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              id={`genre-pill-${genre.replace(/\s+/g, '-').toLowerCase()}`}
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold font-sans border-2 transition-all duration-300 cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 border-transparent text-white shadow-md shadow-orange-500/20 scale-105'
                  : 'bg-white border-orange-100 hover:border-orange-350 hover:bg-orange-50/30 text-orange-950 hover:scale-102'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-orange-650 font-mono mt-2 sm:mt-0">
          Showing {filteredAndSortedBooks.length} of {books.length} Books
        </span>
      </div>

      {/* Books Card Grid */}
      {filteredAndSortedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" id="book-grid-cards">
          {filteredAndSortedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white border border-stone-200 rounded-2xl shadow-sm max-w-xl mx-auto w-full">
          <div className="rounded-full bg-stone-100 p-4 text-stone-400 mb-4 animate-pulse">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-serif font-semibold text-stone-950">No volumes match your search</h3>
          <p className="text-sm text-stone-500 mt-2 max-w-md font-sans leading-relaxed">
            We couldn't locate books priced under ₹{priceRange.toLocaleString('en-IN')} matching "{searchQuery}". Try increasing the price range, choosing another genre pill, or ask Socrates to help!
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
            <button
              id="no-books-action-ai-scifi"
              onClick={() => onSelectAiGenre("Can you recommend an exceptional sci-fi book and explain its themes?")}
              className="px-4 py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-xl text-xs border border-stone-200 transition font-mono cursor-pointer"
            >
              Recommend a Sci-Fi
            </button>
            <button
              id="no-books-action-ai-biography"
              onClick={() => onSelectAiGenre("I love historical espionage and conspiracies. What do we have on the Medici and Renaissance Florence?")}
              className="px-4 py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-xl text-xs border border-stone-200 transition font-mono cursor-pointer"
            >
              Recommend a History Thriller
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
