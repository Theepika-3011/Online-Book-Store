import React, { useState, useEffect, useRef } from 'react';
import { Book, CartItem, Review, OrderDetails } from './types';
import { INITIAL_BOOKS, INITIAL_REVIEWS } from './data/books';
import BookGrid from './components/BookGrid';
import BookModal from './components/BookModal';
import {
  Library,
  BookOpen,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  BadgePercent,
  Truck,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // --- Persistent Storage State ---
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('bookstore_catalog');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Book[];
        const savedIds = new Set(parsed.map(b => b.id));
        const missing = INITIAL_BOOKS.filter(b => !savedIds.has(b.id));
        if (missing.length > 0) {
          return [...parsed, ...missing];
        }
        return parsed;
      } catch (e) {
        return INITIAL_BOOKS;
      }
    }
    return INITIAL_BOOKS;
  });

  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('bookstore_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, Review[]>;
        const updated = { ...parsed };
        let changed = false;
        for (const [key, val] of Object.entries(INITIAL_REVIEWS)) {
          if (!updated[key]) {
            updated[key] = val;
            changed = true;
          }
        }
        return updated;
      } catch (e) {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bookstore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // --- UI Control States ---
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  
  // --- Checkout System States ---
  const [checkoutStep, setCheckoutStep] = useState<'none' | 'form' | 'receipt'>('none');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<boolean>(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [isShippingExpress, setIsShippingExpress] = useState(false);
  const [recentOrder, setRecentOrder] = useState<OrderDetails | null>(null);

  // --- Floating Toast Notification ---
  const [toasts, setToasts] = useState<{ id: string; bookTitle: string }[]>([]);

  const triggerCartToast = (bookTitle: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, bookTitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  // --- Synchronize storage ---
  useEffect(() => {
    localStorage.setItem('bookstore_catalog', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('bookstore_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('bookstore_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Mathematical Calculations ---
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * 0.20 : 0; // 20% discount code
  const shippingCost = itemsCount === 0 ? 0 : isShippingExpress ? 299.00 : 99.00;
  const grandTotal = subtotal - discount + shippingCost;

  // --- Dummy handle needed for BookGrid callbacks in the unified view ---
  const handleSelectAiGenre = (promptText: string) => {
    // Left simple to avoid errors while maintaining a clean, professional search experience
  };

  // --- Cart handlers ---
  const onAddToCart = (book: Book, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
         return prev.map((item) =>
           item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
         );
      }
      return [...prev, { book, quantity: 1 }];
    });
    
    try {
      window.alert(`"${book.title}" has been successfully added to your Bookstore Shopping Cart!`);
    } catch (err) {
      console.warn("Javascript pop-up blocked by the sandboxed layout preview pane.", err);
    }

    triggerCartToast(book.title);
  };

  const updateCartQuantity = (bookId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.book.id === bookId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const onRemoveCartItem = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  // --- Reviews posting handler ---
  const handleAddReview = (bookId: string, reviewerName: string, rating: number, comment: string) => {
    const freshReview: Review = {
      id: `rev-${Date.now()}`,
      user: reviewerName,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setReviews((prev) => {
      const currentReviews = prev[bookId] || [];
      return {
        ...prev,
        [bookId]: [freshReview, ...currentReviews]
      };
    });

    // Update book score rating
    setBooks((prevBooks) => {
      return prevBooks.map((b) => {
        if (b.id === bookId) {
          const currentList = reviews[bookId] || [];
          const allRatings = [rating, ...currentList.map((r) => r.rating)];
          const nextAvg = allRatings.reduce((s, r) => s + r, 0) / allRatings.length;
          return { ...b, rating: Number(nextAvg.toFixed(1)) };
        }
        return b;
      });
    });
  };

  // --- Promo code handler ---
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ALEXANDRIA' || code === 'BOOKSTORE') {
      setAppliedPromo(true);
      setPromoMessage('Promo Code Applied! 20% discount successfully deducted.');
    } else {
      setPromoMessage('Invalid coupon code. Try: "ALEXANDRIA"');
      setAppliedPromo(false);
    }
  };

  // --- Place Order handler ---
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingEmail || !shippingAddress) return;

    const orderId = `BKS-${Math.floor(Math.random() * 900000) + 100000}`;
    const today = new Date();
    const deliveryDelta = isShippingExpress ? 2 : 5;
    const estDate = new Date(today.getTime() + (deliveryDelta * 24 * 60 * 60 * 1000));

    const invoice: OrderDetails = {
      orderId,
      items: [...cart],
      subtotal,
      discount,
      total: grandTotal,
      shipping: {
        name: shippingName,
        email: shippingEmail,
        address: shippingAddress,
        city: shippingCity,
        zipCode: shippingZip
      },
      date: today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      estimatedDelivery: estDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    };

    setRecentOrder(invoice);
    setCheckoutStep('receipt');
    setCart([]); // Reset Cart
  };

  const closeReceiptAndReset = () => {
    setCheckoutStep('none');
    setCartOpen(false);
    setRecentOrder(null);
    setShippingName('');
    setShippingEmail('');
    setShippingAddress('');
    setShippingCity('');
    setShippingZip('');
    setAppliedPromo(false);
    setPromoCode('');
    setPromoMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBEF] via-[#FFF3E0] to-[#FFEBEB] text-stone-900 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-950" id="bookstore-layout">
      
      {/* 1. Header Bar */}
      <header className="border-b-2 border-orange-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-xs" id="app-header">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/15">
            <Library className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-orange-950 leading-none">
              Bookstore
            </h1>
            <span className="text-[10px] font-mono text-orange-600 uppercase tracking-widest block mt-1.5">
              Theepika Book Collections
            </span>
          </div>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-3">
          <button
            id="global-cart-toggle-btn"
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold border-0 px-4 py-2.5 transition-all duration-350 relative shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs font-mono font-bold hidden sm:inline">Shopping Cart</span>
            {itemsCount > 0 && (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={itemsCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-mono font-bold text-orange-950 ring-2 ring-white shadow-sm"
                >
                  {itemsCount}
                </motion.span>
              </AnimatePresence>
            )}
          </button>
        </div>
      </header>

      {/* 2. Main Content Space - Full Width Grid layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-8" id="store-main-stage">
        
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-col sm:items-center justify-between gap-6 border-0">
          {/* Decorative bright overlay shapes for extra designer polish */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl pointer-events-none -translate-x-12 translate-y-12" />

          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#FFF8F0] bg-white/20 rounded px-2.5 py-1 border border-white/30 backdrop-blur-xs">
              Curated Literary Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-3 leading-snug">
              Immerse Yourself in Stories That Inspire
            </h2>
            <p className="text-sm text-orange-50 mt-1.5 leading-relaxed">
              Welcome to our boutique bookstore. Explore handpicked masterpieces, read deep critiques from the community, and enjoy express courier delivery directly to your doorstep.
            </p>
          </div>
        </div>

        {/* Master Catalog Stage Grid - Spans full page width */}
        <div id="bookshelf-parlour-main">
          <BookGrid
            books={books}
            onViewDetails={(book) => setSelectedBook(book)}
            onAddToCart={(book, e) => onAddToCart(book, e)}
            onSelectAiGenre={handleSelectAiGenre}
          />
        </div>
      </main>

      {/* 3. Detailed Review / Details Modal */}
      <BookModal
        book={selectedBook}
        isOpen={selectedBook !== null}
        onClose={() => setSelectedBook(null)}
        onAddToCart={(bk) => {
          onAddToCart(bk);
        }}
        reviews={selectedBook ? (reviews[selectedBook.id] || []) : []}
        onAddReview={handleAddReview}
      />

      {/* 4. Purchases Drawer Tray / Checkout Modal Overlay */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end" id="purchases-drawer-portal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs"
              id="purchases-backdrop"
            />

            {/* Slide Drawer window */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-white border-l border-stone-200 h-full shadow-2xl flex flex-col text-stone-800"
              id="purchases-drawer-window"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-orange-100 bg-orange-50/50 flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-orange-950 font-bold flex items-center gap-1.5">
                  <ShoppingBag className="h-4 w-4 text-orange-500" />
                  Your Shopping Cart ({itemsCount})
                </h3>
                <button
                  id="close-purchases-drawer-btn"
                  onClick={() => setCartOpen(false)}
                  className="text-orange-400 hover:text-orange-600 hover:rotate-180 transition-transform duration-300"
                >
                  <Plus className="h-4 w-4 rotate-45" />
                </button>
              </div>

              {/* Checkout flow toggle */}
              {checkoutStep === 'none' && (
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  
                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div key={item.book.id} className="flex gap-4 p-3 bg-orange-50/20 rounded-xl border border-orange-100 items-center justify-between hover:bg-orange-50/50 transition-colors duration-200">
                          <div className="flex gap-3 items-center">
                            {/* Simple clean cover artwork thumbnail */}
                            <div className={`w-8 h-12 bg-gradient-to-br ${item.book.coverBg} rounded border-l-2 border-black/30 shrink-0 relative flex items-center justify-center font-serif text-[10px] font-bold text-white select-none`}>
                              {item.book.title[0]}
                            </div>

                            <div className="flex flex-col">
                              <span className="text-xs font-serif font-bold text-stone-900 line-clamp-1">{item.book.title}</span>
                              <span className="text-[10px] text-orange-600 font-mono">₹{item.book.price.toLocaleString('en-IN')} each</span>
                            </div>
                          </div>

                          {/* Controls row */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white border border-orange-200 px-2 py-1 rounded-lg">
                              <button
                                id={`cart-qty-minus-${item.book.id}`}
                                onClick={() => updateCartQuantity(item.book.id, -1)}
                                className="text-orange-500 hover:text-orange-700 transition"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-mono font-bold text-stone-850">{item.quantity}</span>
                              <button
                                id={`cart-qty-plus-${item.book.id}`}
                                onClick={() => updateCartQuantity(item.book.id, 1)}
                                className="text-orange-500 hover:text-orange-700 transition"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              id={`cart-remove-${item.book.id}`}
                              onClick={() => onRemoveCartItem(item.book.id)}
                              className="text-orange-400 hover:text-rose-600 hover:border-rose-300 p-1.5 bg-white border border-orange-200 rounded transition"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                        <ShoppingBag className="h-10 w-10 text-stone-400 mb-3" />
                        <h4 className="text-sm font-semibold text-stone-700">Your cart is empty</h4>
                        <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                          Feel free to browse our premium collection of classics and modern publications to find your next great read!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-orange-50/50 border-t border-orange-100 space-y-4">
                    {cart.length > 0 && (
                      <div className="bg-white border border-orange-100 p-3.5 rounded-xl shadow-xs">
                        <span className="block text-[10px] font-mono text-orange-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                          <BadgePercent className="h-3.5 w-3.5 text-orange-500" />
                          Apply Promo Coupon Code
                        </span>
                        <div className="flex gap-2">
                          <input
                            id="coupon-code-text-input"
                            type="text"
                            placeholder="e.g. BOOKSTORE"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={appliedPromo}
                            className="bg-orange-50/20 border border-orange-200 focus:border-orange-450 focus:outline-none rounded-lg px-2.5 py-1.5 text-xs text-stone-800 placeholder-stone-400 flex-1 uppercase"
                          />
                          <button
                            id="apply-coupon-btn"
                            disabled={appliedPromo}
                            onClick={handleApplyPromo}
                            className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold rounded-lg px-3.5 py-1.5 text-xs font-mono transition cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                        {promoMessage && (
                          <p className={`text-[10px] mt-1.5 font-sans font-medium ${appliedPromo ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}`}>
                            {promoMessage}
                          </p>
                        )}
                      </div>
                    )}

                    {cart.length > 0 && (
                      <div className="space-y-1.5 text-xs font-sans">
                        <div className="flex justify-between text-stone-500">
                          <span>Subtotal Items</span>
                          <span className="font-mono text-orange-950 font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        {appliedPromo && (
                          <div className="flex justify-between text-emerald-700 font-bold">
                            <span>Slashed discount (-20%)</span>
                            <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-orange-100 pt-1.5 text-stone-700 font-semibold">
                          <span>Estimated Net Total</span>
                          <span className="font-mono text-rose-600 font-bold">₹{(subtotal - discount).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    )}

                    <button
                      id="cart-proceed-checkout-btn"
                      onClick={() => setCheckoutStep('form')}
                      disabled={cart.length === 0}
                      className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-orange-500/15 hover:shadow-orange-500/25 cursor-pointer disabled:opacity-45"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}

              {/* Checkout Step: Shipping details form */}
              {checkoutStep === 'form' && (
                <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#B26A3A] font-bold mb-2">
                       Shipping & Delivery coordinates
                    </h4>

                    <div>
                      <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">Full Name</label>
                      <input
                        id="shipping-form-name-input"
                        type="text"
                        required
                        placeholder="John Locke"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">Email Address</label>
                      <input
                        id="shipping-form-email-input"
                        type="email"
                        required
                        placeholder="locke@example.com"
                        value={shippingEmail}
                        onChange={(e) => setShippingEmail(e.target.value)}
                        className="w-full bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">Delivery Address</label>
                      <input
                        id="shipping-form-address-input"
                        type="text"
                        required
                        placeholder="7 Broad Street"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">City</label>
                        <input
                          id="shipping-form-city-input"
                          type="text"
                          required
                          placeholder="Oxford"
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          className="w-full bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">Zip Code</label>
                        <input
                          id="shipping-form-zip-input"
                          type="text"
                          required
                          placeholder="OX1 3BQ"
                          value={shippingZip}
                          onChange={(e) => setShippingZip(e.target.value)}
                          className="w-full bg-white border border-orange-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400"
                        />
                      </div>
                    </div>

                    {/* Delivery Rates */}
                    <div className="bg-orange-50/30 border border-orange-100 rounded-xl p-3.5 space-y-3">
                      <span className="block text-[10px] font-mono text-orange-700 uppercase tracking-widest flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5 text-orange-500" />
                        Choose Delivery Speed
                      </span>

                      <div className="space-y-2">
                        <label className="flex items-center justify-between p-2.5 bg-white border border-orange-100 rounded-lg cursor-pointer hover:border-orange-300">
                          <div className="flex items-center gap-2">
                            <input
                              id="shipping-rate-standard"
                              type="radio"
                              name="shipping_option"
                              checked={!isShippingExpress}
                              onChange={() => setIsShippingExpress(false)}
                              className="accent-orange-500 cursor-pointer"
                            />
                            <div className="text-left">
                              <span className="text-xs text-stone-800 font-semibold block">Standard Courier</span>
                              <span className="text-[10px] text-stone-400 font-sans block">Delivered in 3-5 Business Days</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-orange-950">₹99.00</span>
                        </label>

                        <label className="flex items-center justify-between p-2.5 bg-white border border-orange-100 rounded-lg cursor-pointer hover:border-orange-300">
                          <div className="flex items-center gap-2">
                            <input
                              id="shipping-rate-express"
                              type="radio"
                              name="shipping_option"
                              checked={isShippingExpress}
                              onChange={() => setIsShippingExpress(true)}
                              className="accent-orange-500 cursor-pointer"
                            />
                            <div className="text-left">
                              <span className="text-xs text-stone-800 font-semibold block">Express Courier</span>
                              <span className="text-[10px] text-stone-400 font-sans block">Guaranteed 1-2 Business Days</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-orange-950">₹299.00</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Checkout */}
                  <div className="p-4 bg-orange-50/50 border-t border-orange-100 space-y-4">
                    <div className="flex justify-between text-xs font-sans text-stone-400 shadow-none">
                      <span>Shipping Mode & Delivery rate:</span>
                      <span className="font-mono text-orange-950 font-bold">₹{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-950 font-bold border-t border-orange-150 pt-2 text-sm">
                      <span className="font-serif text-orange-950">Grand Total Amount:</span>
                      <span className="font-mono text-rose-600 font-bold">₹{grandTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        id="shipping-back-to-cart-btn"
                        type="button"
                        onClick={() => setCheckoutStep('none')}
                        className="bg-white border border-orange-200 rounded-xl px-4 py-3 text-xs font-bold text-orange-950 hover:bg-orange-50/30 transition cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        id="shipping-complete-order-btn"
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-orange-500/15 cursor-pointer"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Checkout Step: Invoice Receipt */}
              {checkoutStep === 'receipt' && recentOrder && (
                <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
                  <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FFFCE8] font-sans leading-relaxed text-stone-700 border-b border-orange-100" id="receipt-container">
                    
                    {/* Checkmark Stamp */}
                    <div className="text-center pt-2">
                      <div className="inline-flex p-4 bg-orange-500/10 border border-orange-200 text-orange-600 rounded-full mb-3">
                        <CheckCircle2 className="h-8 w-8 text-orange-600" />
                      </div>
                      <h4 className="text-lg font-serif font-bold tracking-tight text-orange-950 uppercase">
                        Bookstore Order Confirmed
                      </h4>
                      <p className="text-[10px] font-mono text-orange-600 uppercase tracking-widest mt-1">
                        Thank you for your business!
                      </p>
                    </div>

                    {/* Order details block */}
                    <div className="border-t border-b border-orange-100 py-3.5 space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Order ID Verification:</span>
                        <span className="text-orange-950 font-bold">{recentOrder.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Order Date:</span>
                        <span className="text-stone-700">{recentOrder.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Est. Arrival Date:</span>
                        <span className="text-orange-950 font-bold">{recentOrder.estimatedDelivery}</span>
                      </div>
                    </div>

                    {/* Address details */}
                    <div className="space-y-1 text-xs">
                      <span className="block text-[10px] font-mono text-orange-600 uppercase tracking-widest leading-none mb-1">Shipping coordinates</span>
                      <p className="font-semibold text-stone-900 font-serif">{recentOrder.shipping.name}</p>
                      <p className="text-stone-600">{recentOrder.shipping.address}</p>
                      <p className="text-stone-600">
                        {recentOrder.shipping.city}, {recentOrder.shipping.zipCode}
                      </p>
                    </div>

                    {/* Published purchase invoice line items */}
                    <div className="space-y-3 pt-3 border-t border-orange-100">
                      <span className="block text-[10px] font-mono text-orange-600 tracking-widest uppercase leading-none">Ordered Volumes</span>
                      
                      <div className="space-y-2">
                        {recentOrder.items.map((item) => (
                          <div key={item.book.id} className="flex justify-between items-start text-xs">
                            <span className="text-stone-850 flex-1 pr-4 font-semibold">
                              {item.book.title} <span className="text-orange-500 font-mono text-[10px]">x{item.quantity}</span>
                            </span>
                            <span className="font-mono text-orange-950 font-bold shrink-0">
                              ₹{(item.book.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom breakdown */}
                    <div className="border-t border-orange-100 pt-3 space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-stone-500">
                        <span>Subtotal Original:</span>
                        <span>₹{recentOrder.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {recentOrder.discount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Discount (20%):</span>
                          <span>-₹{recentOrder.discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-stone-500">
                        <span>Courier Shipping Fee:</span>
                        <span>₹{isShippingExpress ? '299.00' : '99.00'}</span>
                      </div>
                      <div className="flex justify-between text-sm text-orange-950 font-bold border-t border-orange-150 pt-2 font-serif">
                        <span>Grand Total Paid:</span>
                        <span className="text-rose-600 font-bold">₹{recentOrder.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="bg-orange-50/20 p-3.5 border border-orange-100 rounded-xl text-center text-xs text-[#8C6239] font-sans">
                      We have compiled details and sent a confirmation message to <span className="text-stone-900 font-bold">{recentOrder.shipping.email}</span>. Thank you for shopping with us!
                    </div>

                  </div>

                  <div className="p-4 bg-orange-50/30 border-t border-orange-100">
                    <button
                      id="receipt-return-to-shelves-btn"
                      onClick={closeReceiptAndReset}
                      className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-orange-500/10"
                    >
                      Return to Bookstore Catalog
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Toast Feedback loop popup */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -30, y: 15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white border-0 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-sans font-bold"
            >
              <div className="h-2 w-2 rounded-full bg-yellow-300 animate-pulse" />
              <span>Added <strong className="text-white">"{toast.bookTitle}"</strong> to Shopping Cart</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 5. Clean Professional Footer */}
      <footer className="border-t border-orange-100 bg-orange-50/20 py-10 px-6" id="app-footer">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="text-orange-500 flex justify-center items-center saturate-200">
            <span className="h-px w-8 bg-orange-200" />
            <span className="mx-3 text-[10px] font-mono tracking-widest uppercase text-orange-700/80">Silent Sanctuary</span>
            <span className="h-px w-8 bg-orange-200" />
          </div>
          
          <p className="font-serif italic text-lg sm:text-xl text-stone-850 leading-relaxed max-w-xl mx-auto">
            "A book is a quiet dream you hold in your hands, a magic mirror reflecting worlds you have yet to build."
          </p>
          
          <p className="text-[11px] font-sans text-stone-500 max-w-md mx-auto leading-relaxed">
            Reading is both a departure and an arrival—a journey where we lose ourselves only to find who we truly are. Keep turning pages, for every chapter is a step into the extraordinary.
          </p>

          <div className="pt-4 border-t border-orange-100/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-orange-950/50">
            <p>© 2023 Theepika Book Collections. All rights reserved.</p>
            <p className="text-orange-650/70">
              Curated with love for the curious soul.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
