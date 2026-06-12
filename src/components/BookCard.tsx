import React from 'react';
import { Book } from '../types';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
  onAddToCart: (book: Book, e: React.MouseEvent) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails, onAddToCart }) => {
  return (
    <motion.div
      id={`book-card-${book.id}`}
      layoutId={`card-container-${book.id}`}
      whileHover={{ y: -6, scale: 1.01, boxShadow: '0 12px 30px -10px rgba(249, 115, 22, 0.15)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => onViewDetails(book)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-lg cursor-pointer p-4 h-full transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:via-orange-500 before:to-rose-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
    >
      {/* 1. Clear Premium Modern Book Cover Design */}
      <div className="relative mb-4 flex justify-center pt-1">
        {/* Shadow */}
        <div className="absolute bottom-[-6px] w-[85%] h-2.5 bg-orange-650/10 rounded-full blur-md opacity-80" />

        <div
          className={`relative w-44 h-60 rounded-r-lg shadow-md transition-all duration-300 group-hover:shadow-lg bg-gradient-to-br ${book.coverBg} flex flex-col justify-between p-5 select-none border-l-4 border-black/30 overflow-hidden shrink-0`}
        >
          {/* Gentle glare highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none rounded-r-lg" />
          
          {/* Subtle clean inner border */}
          <div className="absolute inset-3 border border-white/10 pointer-events-none rounded" style={{ borderWidth: '0.5px' }} />

          {/* Top category label inside cover */}
          <div className="z-10 text-[9px] font-mono tracking-widest text-[#FAF8F5]/60 uppercase">
            {book.genre}
          </div>

          {/* Main Book Title on Cover - LARGE, HIGH CONTRAST, HIGHLY READABLE */}
          <div className="z-10 my-auto text-center px-1">
            <h4 className="font-serif text-[17px] sm:text-base font-bold text-[#FAF8F5] leading-snug tracking-normal line-clamp-3">
              {book.title}
            </h4>
            <div className="w-8 h-[2px] bg-amber-500/50 mx-auto my-2" />
            <p className="font-sans text-[10px] text-[#FAF8F5]/80 tracking-normal font-medium leading-tight">
              {book.author}
            </p>
          </div>

          {/* Bottom simple indicator */}
          <div className="z-10 text-[8px] font-mono tracking-widest text-center text-[#FAF8F5]/30">
            PREMIUM EDITION
          </div>
        </div>
      </div>

      {/* 2. Clear Metadata Panel underneath */}
      <div className="mt-auto flex flex-col pt-3 border-t border-orange-50">
        <span className="text-xs text-orange-650 font-sans">
          by {book.author}
        </span>
        <h3 className="text-base font-serif font-bold text-stone-900 mt-0.5 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {book.title}
        </h3>

        {/* Dynamic status labels */}
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          {book.isBestseller && (
            <span className="inline-flex items-center rounded bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider shadow-xs">
              Bestseller
            </span>
          )}
          <span className="inline-flex items-center rounded bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 px-1.5 py-0.5 text-[8px] font-bold text-orange-700 uppercase tracking-widest">
            {book.genre}
          </span>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mt-2 mb-3">
          <div className="flex items-center text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="text-xs font-semibold text-stone-700">{book.rating.toFixed(1)}</span>
          <span className="text-[10px] text-stone-400 font-mono">/ 5.0</span>
        </div>

        {/* Price & Cart Actions */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-base font-serif font-bold text-orange-650">
            ₹{book.price.toLocaleString('en-IN')}
          </span>
          
          <button
            id={`book-add-to-cart-${book.id}`}
            onClick={(e) => onAddToCart(book, e)}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-3.5 py-1.5 text-xs font-bold transition-all duration-300 shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.05] cursor-pointer border-transparent"
          >
            + Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
