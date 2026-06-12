import React, { useState } from 'react';
import { Book, Review } from '../types';
import { X, Star, ShoppingBag, BookOpen, Clock, Calendar, ShieldCheck, MessageSquare, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  reviews: Review[];
  onAddReview: (bookId: string, author: string, rating: number, text: string) => void;
}

export default function BookModal({ book, isOpen, onClose, onAddToCart, reviews, onAddReview }: BookModalProps) {
  const [newReviewer, setNewReviewer] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen || !book) return null;

  // Book initials
  const initials = book.title
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer.trim() || !newText.trim()) return;

    onAddReview(book.id, newReviewer.trim(), newRating, newText.trim());
    
    // reset form
    setNewReviewer('');
    setNewRating(5);
    setNewText('');
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="book-modal-portal">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          id="book-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 text-stone-900 shadow-2xl p-6 sm:p-8"
          id="book-modal-container"
        >
          {/* Close button */}
          <button
            id="book-modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-orange-600 hover:text-orange-850 bg-orange-50 p-2 rounded-full border border-orange-100 hover:border-orange-200 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Core Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
            {/* Left Column: Visual Cover Stage & Purchase info */}
            <div className="md:col-span-5 flex flex-col items-center">
              {/* 3D Realistic Cover Book Stage */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-stone-900/10 blur-xl opacity-60 translate-y-4" />
                <div
                  className={`w-52 h-76 rounded-r-xl shadow-2xl bg-gradient-to-br ${book.coverBg} flex flex-col justify-between p-6 select-none border-l-8 border-black/40 overflow-hidden relative`}
                >
                  {/* Subtle shine */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none rounded-r-xl" />
                  
                  {/* Outer border highlight */}
                  <div className="absolute top-3 left-3 right-3 bottom-3 border border-white/10 pointer-events-none rounded" style={{ borderWidth: '0.5px' }} />

                  {/* Motif */}
                  <div className={`mt-3 flex justify-center ${book.coverPatternColor} opacity-80`}>
                    <div className="flex flex-col items-center gap-1 border border-current rounded-full px-2.5 py-4 text-xs font-mono tracking-widest leading-none">
                      <span>{initials}</span>
                      <div className="h-[1px] w-8 bg-current" />
                      <span>{book.publishedYear}</span>
                    </div>
                  </div>

                  {/* Text labels */}
                  <div className="z-10 mt-auto">
                    <h3 className="font-serif text-lg font-semibold text-stone-100 tracking-wide leading-tight">
                      {book.title}
                    </h3>
                    <p className="mt-1 font-sans text-xs text-stone-300/80 tracking-widest uppercase">
                      {book.author}
                    </p>
                  </div>

                  {/* Left inner shadow spine depth */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/10 pointer-events-none" />
                </div>
              </div>

              {/* Instant purchase container */}
              <div className="w-full bg-orange-50/20 border border-orange-150 p-5 rounded-xl text-center shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-stone-500 font-sans text-sm">Price per Volume</span>
                  <span className="text-2xl font-serif font-bold text-orange-950">₹{book.price.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-550 mb-4 pb-4 border-b border-orange-100">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-650" />
                    Available In Stock
                  </span>
                  <span className="font-mono text-orange-950 font-bold">{book.stock} left</span>
                </div>

                <button
                  id="book-modal-add-to-cart-action"
                  onClick={() => {
                    onAddToCart(book);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-3.5 px-4 shadow-md shadow-orange-500/10 transition duration-150 cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Right Column: Descriptions, Metadata, Reviews system */}
            <div className="md:col-span-7 flex flex-col justify-between text-stone-800">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-orange-600 font-bold">
                  {book.genre}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 hover:text-orange-600 transition-colors duration-200">
                  {book.title}
                </h2>
                <p className="text-stone-600 font-sans text-sm mt-1">
                  by <span className="font-semibold text-orange-950 hover:underline cursor-pointer">{book.author}</span>
                </p>

                {/* Star overview */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(book.rating) ? 'fill-current' : 'text-orange-100'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-stone-800 font-mono font-semibold">
                    {book.rating.toFixed(1)} / 5.0
                  </span>
                  <span className="text-[#A27339] text-xs font-mono">• {reviews.length} reviews</span>
                </div>

                {/* Fast-Facts Badges */}
                <div className="grid grid-cols-3 gap-3 my-5">
                  <div className="bg-orange-50/25 border border-orange-100 p-3 rounded-lg text-center hover:bg-orange-50/50 transition duration-200">
                    <BookOpen className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                    <span className="block text-[10px] text-orange-400 font-mono uppercase">Length</span>
                    <span className="text-xs font-bold text-orange-950 font-mono">{book.pages} pages</span>
                  </div>
                  <div className="bg-orange-50/25 border border-orange-100 p-3 rounded-lg text-center hover:bg-orange-50/50 transition duration-200">
                    <Clock className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                    <span className="block text-[10px] text-orange-400 font-mono uppercase">Published</span>
                    <span className="text-xs font-bold text-orange-950 font-mono">{book.publishedYear}</span>
                  </div>
                  <div className="bg-orange-50/25 border border-orange-100 p-3 rounded-lg text-center hover:bg-orange-50/50 transition duration-200">
                    <Calendar className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                    <span className="block text-[10px] text-orange-400 font-mono uppercase">Language</span>
                    <span className="text-xs font-bold text-orange-950 line-clamp-1">{book.language}</span>
                  </div>
                </div>

                {/* Synopsis / Paragraph */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1.5">
                    Literary Summary
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed font-sans">
                    {book.synopsis}
                  </p>
                </div>
              </div>

              {/* Reviews System */}
              <div className="border-t border-orange-100 pt-5 mt-4">
                <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-orange-700 font-bold mb-4">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Reader Critiques ({reviews.length})
                </span>

                {/* Review Feed list */}
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 mb-6" id="reviews-list-container">
                  {reviews.length > 0 ? (
                    reviews.map((rev) => (
                      <div key={rev.id} className="bg-orange-50/15 border border-orange-100/60 p-3.5 rounded-xl">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-orange-950">{rev.user}</span>
                          <span className="text-[10px] text-[#A27339] font-mono">{rev.date}</span>
                        </div>
                        {/* Rating row */}
                        <div className="flex text-amber-500 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'text-orange-100'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-stone-600 font-sans mt-2 italic leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#A27339] italic py-2">
                       No customer feedback has been entered yet. Be the first to share your literary reaction!
                    </p>
                  )}
                </div>

                {/* Submit New Critical Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-orange-50/20 border border-orange-150 p-4 rounded-xl shadow-xs">
                  <h5 className="text-xs font-bold text-orange-950 mb-3 block">Write an Academic Critique</h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      id="critique-form-name-input"
                      type="text"
                      required
                      placeholder="Your Pen Name (e.g. Jean-Luc)"
                      value={newReviewer}
                      onChange={(e) => setNewReviewer(e.target.value)}
                      className="bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-lg p-2 text-xs text-stone-800 placeholder-stone-400"
                    />

                    {/* Interactive Star Rating Selector */}
                    <div className="flex items-center gap-1 justify-between sm:justify-start">
                      <span className="text-xs text-[#A27339] font-sans mr-2">Your Rating:</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            id={`critique-form-star-${starVal}`}
                            key={starVal}
                            type="button"
                            onClick={() => setNewRating(starVal)}
                            className="text-amber-500 hover:scale-110 active:scale-95 transition cursor-pointer"
                          >
                            <Star
                              className={`h-4 w-4 ${starVal <= newRating ? 'fill-current' : 'text-orange-100'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="critique-form-text-textarea"
                      required
                      rows={2}
                      placeholder="Share your response to the author's prose, historical context, or core philosophical arguments..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="w-full bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400 resize-none font-sans"
                    />
                  </div>

                  <div className="flex justify-between items-center mt-2.5">
                    {submitSuccess ? (
                      <span className="text-[11px] font-sans text-emerald-600 flex items-center gap-1.5 animate-pulse">
                        <Check className="h-3.5 w-3.5" />
                        Critique posted successfully!
                      </span>
                    ) : (
                      <span className="text-[10px] text-orange-600/70">
                        *All submissions are immediately saved locally.
                      </span>
                    )}

                    <button
                      id="critique-form-submit-action"
                      type="submit"
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold rounded-lg text-xs hover:text-[#FAF8F5] transition duration-150 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      Post Review
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
