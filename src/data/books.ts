import { Book, Review } from '../types';

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  '1': [
    {
      id: 'r1',
      user: 'Evelyn Carter',
      rating: 5,
      comment: 'An absolute masterpiece of modern science fiction. The details about quantum entanglement are stunningly integrated.',
      date: 'June 01, 2026'
    },
    {
      id: 'r2',
      user: 'Marcus Vance',
      rating: 4,
      comment: 'Extremely well-written. The pacing is beautiful and the characters feel incredibly alive.',
      date: 'May 24, 2026'
    }
  ],
  '2': [
    {
      id: 'r3',
      user: 'Julian Thorne',
      rating: 5,
      comment: 'One of the best biographies I have ever read. The author highlights both triumphs and flaws with pure objectivity.',
      date: 'June 08, 2026'
    }
  ],
  '3': [
    {
      id: 'r4',
      user: 'Samantha Lin',
      rating: 4,
      comment: 'A profound must-read for any software developer. The essays on code clarity and structural responsibility are timeless.',
      date: 'April 15, 2026'
    },
    {
      id: 'r5',
      user: 'Leo Fitz',
      rating: 5,
      comment: 'Changed how I think about system architectures. The chapter on decoupling is worth the price of the book alone.',
      date: 'May 12, 2026'
    }
  ],
  '4': [
    {
      id: 'r6',
      user: 'Clara Dubois',
      rating: 5,
      comment: 'The French countryside simply leaps off the page. The recipes and historical context are thoroughly enchanting.',
      date: 'June 05, 2026'
    }
  ],
  '5': [
    {
      id: 'r7',
      user: 'Dr. Arthur Pendelton',
      rating: 5,
      comment: 'An exceptional deep-dive into cognitive linguistics. Explains complex neural concepts in a language accessible to the curious layperson.',
      date: 'March 29, 2026'
    }
  ],
  '9': [
    {
      id: 'r8',
      user: 'Isabella Moretti',
      rating: 5,
      comment: 'Elena Rostova captures the sublime essence of light. A profound exploration of how space interacts with the natural world.',
      date: 'June 09, 2026'
    }
  ],
  '10': [
    {
      id: 'r9',
      user: 'Vikram Mehta',
      rating: 4,
      comment: 'An absolute tour de force on computation history. Blends deep history and state-of-the-art engineering masterfully.',
      date: 'May 30, 2026'
    }
  ],
  '11': [
    {
      id: 'r10',
      user: 'Chloe de Beauvoir',
      rating: 5,
      comment: 'Such a gorgeous call to voluntary minimalism. This volume itself is a beautifully written model of refinement and grace.',
      date: 'June 02, 2026'
    }
  ],
  '12': [
    {
      id: 'r11',
      user: 'Anoop Nair',
      rating: 5,
      comment: 'A spellbinding history of trade networks. Rajesh Sharma draws gorgeous vistas of wood and spice under seasonal monsoon winds.',
      date: 'May 18, 2026'
    }
  ],
  '13': [
    {
      id: 'r12',
      user: 'Karel Hasek',
      rating: 4,
      comment: 'A mysterious Kafkaesque love letter to the magical atmosphere of Prague. Perfectly calibrated pacing and gorgeous metaphors.',
      date: 'June 07, 2026'
    }
  ],
  '14': [
    {
      id: 'r13',
      user: 'Aris Thorne',
      rating: 5,
      comment: 'Splendid sequel! Dr. Helen Vance continues to stretch the boundaries of physics with evocative and poetic descriptions.',
      date: 'June 10, 2026'
    }
  ],
  '15': [
    {
      id: 'r14',
      user: 'Linus Sterling',
      rating: 4,
      comment: 'An enchanting, beautifully woven contemporary fable with heavy atmospheric magic. A stunning tribute to Scandinavian forests.',
      date: 'May 14, 2026'
    }
  ],
  '16': [
    {
      id: 'r15',
      user: 'Amelia Gray',
      rating: 5,
      comment: 'Chef Hiroshi Tanaka breaks down gastronomy into a fine art of colors, textures, and seasons. Spectacular read!',
      date: 'May 28, 2026'
    }
  ],
  '17': [
    {
      id: 'r16',
      user: 'Dr. Arthur Pendelton',
      rating: 5,
      comment: 'A magnificent study. Jenkins explores neural networks and recursive optimization with clear, accessible, and deep clarity.',
      date: 'June 04, 2026'
    }
  ],
  '18': [
    {
      id: 'r17',
      user: 'Celine Dionne',
      rating: 5,
      comment: 'A beautifully poetic and scientifically accurate exploration of the unexplored trenches of our planet.',
      date: 'June 01, 2026'
    }
  ],
  '19': [
    {
      id: 'r18',
      user: 'Amir Yazdi',
      rating: 5,
      comment: 'Astonishing detail. Translating ancient Dunhuang logs has never felt more alive.',
      date: 'June 10, 2026'
    }
  ],
  '20': [
    {
      id: 'r19',
      user: 'Sora Tanaka',
      rating: 5,
      comment: 'A breathtakingly calm commentary on minimalism. A ultimate treasure for any refined collector.',
      date: 'June 08, 2026'
    }
  ],
  '21': [
    {
      id: 'r20',
      user: 'Chloe Vance',
      rating: 5,
      comment: 'Spectacular prose paired with precise, beautiful celestial maps. Highly recommended!',
      date: 'June 11, 2026'
    }
  ],
  '22': [
    {
      id: 'r21',
      user: 'Ravi Shastri',
      rating: 4,
      comment: 'An evocative, wonderfully tactile study of ancient clay and pottery dynamics throughout human history.',
      date: 'May 25, 2026'
    }
  ],
  '23': [
    {
      id: 'r22',
      user: 'Isla Doherty',
      rating: 5,
      comment: 'An absolute page-turner of high-concept science fiction with genuinely mind-bending timeline mechanics.',
      date: 'June 03, 2026'
    }
  ],
  '24': [
    {
      id: 'r23',
      user: 'Genevieve Roy',
      rating: 5,
      comment: 'Deeply moving, historical, and beautifully compiled. Unlocks forgotten voices of pioneering courage.',
      date: 'June 09, 2026'
    }
  ],
  '25': [
    {
      id: 'r24',
      user: 'Liam MacIntyre',
      rating: 5,
      comment: 'A magnificent masterpiece of literary fiction. Lars Lindqvist captures the absolute essence of solitude and longing.',
      date: 'June 08, 2026'
    }
  ],
  '26': [
    {
      id: 'r25',
      user: 'Dr. Kiyoshi Tanaka',
      rating: 5,
      comment: 'The definitive textbook of the decade. The absolute gold standard for technical architectures and deep machine models.',
      date: 'June 05, 2026'
    }
  ],
  '27': [
    {
      id: 'r26',
      user: 'Anahita Al-Khamis',
      rating: 4,
      comment: 'A spectacular historical survey! Highlights the life and trade patterns surrounding early Middle-Eastern waterways with pristine precision.',
      date: 'June 10, 2026'
    }
  ],
  '28': [
    {
      id: 'r27',
      user: 'Nils Lindqvist',
      rating: 5,
      comment: 'Astrophysicist Evelyn Carter is back with a lyrical book that moves you to tears while explaining the complex laws of black holes.',
      date: 'June 11, 2026'
    }
  ],
  '29': [
    {
      id: 'r28',
      user: 'Marie-Thérèse Lefebvre',
      rating: 5,
      comment: 'I am completely spellbound. Beautiful photos of copper pots and outstanding fermentation recipes that turn cooking into active art.',
      date: 'June 07, 2026'
    }
  ],
  '30': [
    {
      id: 'r29',
      user: 'Sophia Vance',
      rating: 5,
      comment: 'A haunting biography of a master artist that reconstructs their private sketches and inner battles with supreme, beautiful tact.',
      date: 'June 09, 2026'
    }
  ]
};

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Quantum Horizon',
    author: 'Dr. Helen Vance',
    genre: 'Sci-Fi',
    price: 1999.00,
    rating: 4.8,
    coverBg: 'from-amber-950 via-slate-900 to-indigo-950',
    coverPatternColor: 'text-amber-400',
    description: 'A mind-bending exploration of space-time anomalies and humanity\'s first interstellar escape.',
    synopsis: 'When a solar observatory registers a gravitational anomaly inside the orbit of Mercury, physicist Evelyn Vance discovers a dormant pathway through space-time. As the earth faces imminent ecological collapse, a crew of reluctant astronauts embark on an unmapped journey. Dr. Vance crafts a stunning narrative of quantum physics, endurance, and speculative philosophy.',
    pages: 412,
    publishedYear: 2025,
    language: 'English',
    stock: 14,
    isBestseller: true
  },
  {
    id: '2',
    title: 'Shadows of the Renaissance',
    author: 'Matteo Rossi',
    genre: 'History',
    price: 1499.00,
    rating: 4.6,
    coverBg: 'from-orange-950 via-stone-900 to-amber-900',
    coverPatternColor: 'text-orange-400',
    description: 'The hidden guilds, quiet conspiracies, and silent struggles of artists in the 15th-century courts.',
    synopsis: 'Beyond the luminous marbles of Michelangelo lies an underworld of espionage, counterfeit workshops, and fierce political clientelism. Matteo Rossi pulls back the elegant curtain on Florentine art history to reveal a dramatic landscape of underground alliances and secret symbols that encoded protests against the Medici rule.',
    pages: 350,
    publishedYear: 2024,
    language: 'English',
    stock: 8,
    isBestseller: false
  },
  {
    id: '3',
    title: 'Architectures of Thought',
    author: 'Sarah Jenkins',
    genre: 'Technology',
    price: 2599.00,
    rating: 4.9,
    coverBg: 'from-emerald-950 via-neutral-900 to-cyan-950',
    coverPatternColor: 'text-emerald-400',
    description: 'A structural guide to systemic mental mapping, software architecture design, and human logic.',
    synopsis: 'How do we design systems that adapt to unpredictable growth? Software pioneer Sarah Jenkins outlines the profound structural overlaps between codebases, architectural monuments, and cognitive mental models. This volume acts as a philosophical treatise on modular design and the preservation of clarity in complex environments.',
    pages: 528,
    publishedYear: 2026,
    language: 'English',
    stock: 22,
    isBestseller: true
  },
  {
    id: '4',
    title: 'La Petite Table',
    author: 'Amélie Rousseau',
    genre: 'Art & Culinary',
    price: 2299.00,
    rating: 4.5,
    coverBg: 'from-red-950 via-neutral-900 to-orange-950',
    coverPatternColor: 'text-rose-400',
    description: 'A sensory journey through French rustic bakeries, seasonal recipes, and aesthetic tableware.',
    synopsis: 'Amélie Rousseau invites readers to slowing down and practicing culinary mindfulness. Combining gorgeous photographic descriptions, historical baker profiles, and 85 seasonal rustic recipes, La Petite Table represents a breathtaking study of aesthetic warmth, design, and culinary craftsmanship.',
    pages: 284,
    publishedYear: 2025,
    language: 'French & English',
    stock: 5,
    isBestseller: false
  },
  {
    id: '5',
    title: 'The Silent Neuro-Symphony',
    author: 'Dr. Kiyoshi Tanaka',
    genre: 'Science',
    price: 1799.00,
    rating: 4.7,
    coverBg: 'from-violet-950 via-indigo-950 to-neutral-950',
    coverPatternColor: 'text-cyan-300',
    description: 'How the human brain deciphers silence, musical pauses, and the architecture of thoughts.',
    synopsis: 'Why is a pause in music often more emotionally charging than a soaring crescendo? Renowned neuroscientist Kiyoshi Tanaka presents a revolutionary exploration of the quiet brain, mapping how neural nets react to silent intervals. He unlocks scientific explanations for intuition, spiritual peace, and artistic awe.',
    pages: 320,
    publishedYear: 2025,
    language: 'English',
    stock: 19,
    isBestseller: true
  },
  {
    id: '6',
    title: 'The Last Cartographer',
    author: 'Sophia Vance',
    genre: 'Fiction',
    price: 1299.00,
    rating: 4.4,
    coverBg: 'from-sky-950 via-teal-950 to-lime-950',
    coverPatternColor: 'text-sky-300',
    description: 'An elegant fable about land loss, rising oceans, and the persistence of memory.',
    synopsis: 'On the islands of the Shattered Reef, dry ground is a currency of memory. Sophia Vance tells the haunting tale of Helena, an aging mapmaker whose family has drawn the high-water marks for seven generations. Helena undertakes a final journey to archive coordinates that are rapidly disappearing into the ocean.',
    pages: 288,
    publishedYear: 2024,
    language: 'English',
    stock: 12,
    isBestseller: false
  },
  {
    id: '7',
    title: 'Echoes of the Ancient Silk',
    author: 'Xian Wei',
    genre: 'History',
    price: 2199.00,
    rating: 4.7,
    coverBg: 'from-yellow-950 via-stone-900 to-amber-950',
    coverPatternColor: 'text-yellow-400',
    description: 'Uncovering lost letters, caravanserais, and the dynamic cultural syncretism of the trade routes.',
    synopsis: 'By compiling contemporary travel logs, desert ledger shreds, and forgotten letters and poems found in Dunhuang caves, scholar Xian Wei reconstructs the daily lives of ancient Silk Road traders. Experience a world of rich multi-cultural hubs, high-energy trade agreements, and deep religious exchange.',
    pages: 395,
    publishedYear: 2023,
    language: 'English',
    stock: 6,
    isBestseller: false
  },
  {
    id: '8',
    title: 'The Code of Nature',
    author: 'Liam O\'Connor',
    genre: 'Science',
    price: 1899.00,
    rating: 4.9,
    coverBg: 'from-green-950 via-zinc-900 to-emerald-950',
    coverPatternColor: 'text-green-400',
    description: 'An exploration of logarithmic spirals, Fibonacci growth, and algorithmic biology.',
    synopsis: 'From the chambers of the nautilus shell to the branch structures of galactic stars, nature reveals a mathematically coherent canvas. Liam O\'Connor guides readers through biomimicry and algorithmic design principles in computer science inspired by natural code architectures.',
    pages: 340,
    publishedYear: 2025,
    language: 'English',
    stock: 10,
    isBestseller: true
  },
  {
    id: '9',
    title: 'The Architecture of Light',
    author: 'Elena Rostova',
    genre: 'Art & Culinary',
    price: 2499.00,
    rating: 4.9,
    coverBg: 'from-amber-900 via-rose-950 to-stone-950',
    coverPatternColor: 'text-rose-400',
    description: 'A magnificent study of natural illumination, sacred geometry, and spaces that breathe.',
    synopsis: 'Architect Elena Rostova explains how sunlight shapes emotional response in modern sanctuaries. From the historic stained glass design of Chartres Cathedral to raw-concrete minimalist Japanese teashops, this book outlines light reflection, shadow modulation, and structural spirituality.',
    pages: 312,
    publishedYear: 2026,
    language: 'English',
    stock: 7,
    isBestseller: true
  },
  {
    id: '10',
    title: 'Ghosts in the Machine',
    author: 'Dev Danesh',
    genre: 'Technology',
    price: 1850.00,
    rating: 4.7,
    coverBg: 'from-blue-950 via-cyan-900 to-indigo-950',
    coverPatternColor: 'text-cyan-400',
    description: 'The profound evolution of intelligence, from clockwork automated looms to neural networks.',
    synopsis: 'Danesh writes a brilliant comparative narrative linking old automated weaving looms, Babbage engines, and advanced transformer architectures. Unpacking the core philosophical question: does code merely execute steps or does it preserve historical human whispers?',
    pages: 440,
    publishedYear: 2025,
    language: 'English',
    stock: 15,
    isBestseller: false
  },
  {
    id: '11',
    title: 'The Philosophy of Elegance',
    author: 'Marie-Thérèse Lefebvre',
    genre: 'Philosophy',
    price: 1699.00,
    rating: 4.8,
    coverBg: 'from-fuchsia-950 via-zinc-900 to-stone-900',
    coverPatternColor: 'text-pink-400',
    description: 'A timeless examination of minimal design, silent eloquence, and lifestyle restraint.',
    synopsis: 'Lefebvre unpacks the historical essence of "elegance" from classical Zen tea ceremonies to modern Scandinavian product design. She argues that true beauty and refinement arise purely from what we choose to subtract, creating powerful focus in an easily distracted world.',
    pages: 256,
    publishedYear: 2024,
    language: 'French & English',
    stock: 9,
    isBestseller: true
  },
  {
    id: '12',
    title: 'Winds of the Monsoon',
    author: 'Dr. Rajesh Sharma',
    genre: 'History',
    price: 1599.00,
    rating: 4.6,
    coverBg: 'from-emerald-950 via-stone-900 to-yellow-950',
    coverPatternColor: 'text-amber-400',
    description: 'Lost memoirs, coastal maps, and the vibrant ancient Indian Ocean spice trade network.',
    synopsis: 'By translating forgotten sea logs from old Malabar coast ports, Rajesh Sharma captures the epic stories of maritime merchants. Trace the seasonal monsoons that powered wooden dhows bearing cinnamon, exquisite muslin, and black pepper across the deep blue Indian Ocean.',
    pages: 380,
    publishedYear: 2025,
    language: 'English',
    stock: 11,
    isBestseller: false
  },
  {
    id: '13',
    title: 'The Alchemist\'s Inkwell',
    author: 'Arthur Pendelton',
    genre: 'Fiction',
    price: 1350.00,
    rating: 4.5,
    coverBg: 'from-violet-950 via-fuchsia-950 to-slate-900',
    coverPatternColor: 'text-yellow-400',
    description: 'A mysterious storyteller whose handwritten words physically transform the reality of readers.',
    synopsis: 'In a quiet bookstore nestled off a cobblestone alley in Prague, young archivist Alistair discovers an inkwell containing a shimmering dark viscous fluid. Every sentence written with it alters small details of Prague\'s history. This beautiful mystery weaves deep loyalty, magical ink, and historical maps.',
    pages: 304,
    publishedYear: 2026,
    language: 'English',
    stock: 13,
    isBestseller: false
  },
  {
    id: '14',
    title: 'Secrets of the Cosmos',
    author: 'Dr. Helen Vance',
    genre: 'Sci-Fi',
    price: 2200.00,
    rating: 4.9,
    coverBg: 'from-slate-950 via-indigo-950 to-black',
    coverPatternColor: 'text-indigo-400',
    description: 'A lyrical dive into gravitational waves, particle physics, and outer planetary telemetry.',
    synopsis: 'From the author of the best-selling book "The Quantum Horizon", this newly edited sequel takes readers to the icy rings of Saturn. Uncover mysteries of cold space, neutrino patterns, and quantum signals captured deep within our galaxy\'s core.',
    pages: 480,
    publishedYear: 2026,
    language: 'English',
    stock: 18,
    isBestseller: true
  },
  {
    id: '15',
    title: 'The Clockwork Forest',
    author: 'Lars Lindqvist',
    genre: 'Fiction',
    price: 1450.00,
    rating: 4.6,
    coverBg: 'from-emerald-950 via-teal-900 to-stone-900',
    coverPatternColor: 'text-emerald-300',
    description: 'An immersive and enchanting fable about a hidden mechanized ecosystem in distant Nordic woods.',
    synopsis: 'Deep in the frozen Swedish wilderness, young engineer Nils discovers an ancient mechanical tree that seems to feed the surrounding forest. This beautifully written fable weaves traditional European folklore, eco-futurism, and complex gearwork to examine our changing relationship with the natural world.',
    pages: 336,
    publishedYear: 2026,
    language: 'English & Swedish',
    stock: 12,
    isBestseller: false
  },
  {
    id: '16',
    title: 'Culinary Alchemy',
    author: 'Chef Hiroshi Tanaka',
    genre: 'Art & Culinary',
    price: 2350.00,
    rating: 4.8,
    coverBg: 'from-red-950 via-amber-950 to-stone-900',
    coverPatternColor: 'text-orange-300',
    description: 'The sublime harmony of modern gastronomy, ancestral fermentation, and minimalist aesthetic design.',
    synopsis: 'World-renowned Chef Hiroshi Tanaka presents an exquisite masterclass of seasonal color palettes, rare local fermentation chemistry, and ceramic pairing. Uncovering the delicate intersection where the culinary art of slow preparation elevates simple elements into transcendental dining memories.',
    pages: 298,
    publishedYear: 2025,
    language: 'English',
    stock: 8,
    isBestseller: true
  },
  {
    id: '17',
    title: 'The Algorithmic Mind',
    author: 'Dr. Sarah Jenkins',
    genre: 'Technology',
    price: 2690.00,
    rating: 4.9,
    coverBg: 'from-indigo-950 via-purple-950 to-neutral-950',
    coverPatternColor: 'text-purple-400',
    description: 'A revolutionary work looking at deep learning models and recursive cognitive architectures.',
    synopsis: 'Building on "Architectures of Thought", Sarah Jenkins investigates how computational neural networks mirror human cognitive heuristics. Unpacking complex math, gradient landscapes, and intelligence boundaries through evocative, layperson-friendly analogies.',
    pages: 512,
    publishedYear: 2026,
    language: 'English',
    stock: 15,
    isBestseller: true
  },
  {
    id: '18',
    title: 'Echoes of the Deep Ocean',
    author: 'Sophia Vance',
    genre: 'Science',
    price: 1750.00,
    rating: 4.5,
    coverBg: 'from-cyan-950 via-blue-900 to-indigo-950',
    coverPatternColor: 'text-sky-400',
    description: 'A scientifically accurate dive into hydrothermal vent dynamics and ancient deep-sea fossils.',
    synopsis: 'A lyrical, stunning exploration of Earth\'s most extreme aquatic biomes. Marine biologist Sophia Vance details hydrothermal communities thriving at extreme temperatures without solar energy, highlighting the bizarre organic adaptations that hint at how life first formed in our solar system.',
    pages: 360,
    publishedYear: 2025,
    language: 'English',
    stock: 14,
    isBestseller: false
  },
  {
    id: '19',
    title: 'Fables of the Silk Road',
    author: 'Anahita Al-Khamis',
    genre: 'History',
    price: 1890.00,
    rating: 4.8,
    coverBg: 'from-amber-950 via-red-950 to-amber-900',
    coverPatternColor: 'text-amber-300',
    description: 'A magnificent tapestry of legendary oasis cities, camel caravans, and ancient folktales.',
    synopsis: 'By studying preserved manuscripts from Samarkand and Dunhuang, Anahita Al-Khamis details the historical, oral, and artistic exchange that occurred along the trans-Eurasian trade routes.',
    pages: 420,
    publishedYear: 2024,
    language: 'English',
    stock: 12,
    isBestseller: true
  },
  {
    id: '20',
    title: 'The Silent Canvas',
    author: 'Kenji Sato',
    genre: 'Philosophy',
    price: 1490.00,
    rating: 4.7,
    coverBg: 'from-stone-900 via-neutral-950 to-amber-950',
    coverPatternColor: 'text-stone-300',
    description: 'Stunning aesthetic reflections on Zen ink wash paintings, negative space, and Japanese Ma.',
    synopsis: 'Art philosopher Kenji Sato presents a profound philosophical critique of mindfulness, silence, and spatial void. He explores the concept of Ma—the artistic consciousness of pure void—and how intentionally empty frames speak louder than noise.',
    pages: 230,
    publishedYear: 2025,
    language: 'English & Japanese',
    stock: 9,
    isBestseller: false
  },
  {
    id: '21',
    title: 'Curiosities of the Sky',
    author: 'Dr. Evelyn Carter',
    genre: 'Science',
    price: 2150.00,
    rating: 4.9,
    coverBg: 'from-violet-950 via-slate-950 to-indigo-950',
    coverPatternColor: 'text-purple-300',
    description: 'A lyrical, comprehensive catalog of celestial nebulae, black holes, and deep stellar phenomena.',
    synopsis: 'Renowned astrophysicist Evelyn Carter takes readers on a sweeping tour through the stellar nurseries of the Orion Nebula and the event horizons of Sagittarius A*. Beautifully blending real astronomical data with breathtaking cosmic poetry.',
    pages: 395,
    publishedYear: 2026,
    language: 'English',
    stock: 16,
    isBestseller: true
  },
  {
    id: '22',
    title: 'The Chronology of Clay',
    author: 'Naveen Ramachandran',
    genre: 'Art & Culinary',
    price: 1980.00,
    rating: 4.6,
    coverBg: 'from-orange-950 via-yellow-950 to-stone-900',
    coverPatternColor: 'text-amber-500',
    description: 'The ancient lineages of terra cotta sculpture, potters\' wheels, and tribal Indus pottery.',
    synopsis: 'Ramachandran follows the tactile trail of earthen crafts across pre-historic civilizations. Packed with gorgeous architectural descriptions, clay composition details, and the timeless human connection with wet earth.',
    pages: 288,
    publishedYear: 2025,
    language: 'English',
    stock: 10,
    isBestseller: false
  },
  {
    id: '23',
    title: 'Parallel Realities',
    author: 'Liam MacIntyre',
    genre: 'Sci-Fi',
    price: 1550.00,
    rating: 4.7,
    coverBg: 'from-emerald-950 via-slate-900 to-teal-950',
    coverPatternColor: 'text-emerald-400',
    description: 'A gripping speculative thriller about quantum bifurcation, parallel pathways, and lost choices.',
    synopsis: 'When researcher Sean wakes up in a version of Dublin where his life-defining breakthrough belongs to his bitter rival, he must navigate cold corporate quantum espionage and recursive dimensions to piece together his original life.',
    pages: 368,
    publishedYear: 2026,
    language: 'English',
    stock: 11,
    isBestseller: true
  },
  {
    id: '24',
    title: 'Voices of the West',
    author: 'Eudora Vance',
    genre: 'Biography',
    price: 1720.00,
    rating: 4.8,
    coverBg: 'from-teal-950 via-stone-900 to-amber-955',
    coverPatternColor: 'text-orange-400',
    description: 'The incredible, untold letters, struggles, and oral memories of forgotten early pioneer women.',
    synopsis: 'A masterpiece biography compiling handwritten letters and personal diaries of 19th-century pioneer women. Eudora Vance brings their silent strength, collective wisdom, and persistent grit back to life.',
    pages: 410,
    publishedYear: 2024,
    language: 'English',
    stock: 13,
    isBestseller: false
  },
  {
    id: '25',
    title: 'The Whispering Leaves',
    author: 'Lars Lindqvist',
    genre: 'Fiction',
    price: 1650.00,
    rating: 4.7,
    coverBg: 'from-emerald-950 via-zinc-900 to-green-950',
    coverPatternColor: 'text-emerald-400',
    description: 'An evocative novel exploring deep connections in deep Swedish spruce wilderness.',
    synopsis: 'Lars Lindqvist delivers a deeply moving, lyrical fable about a retired biologist who is chosen to decode unusual communication signals radiating from a mature cedar network deep within an remote Scandinavian reservation.',
    pages: 320,
    publishedYear: 2026,
    language: 'English',
    stock: 12,
    isBestseller: true
  },
  {
    id: '26',
    title: 'The Neural Architecture Code',
    author: 'Dr. Sarah Jenkins',
    genre: 'Technology',
    price: 2800.00,
    rating: 4.9,
    coverBg: 'from-blue-950 via-purple-950 to-neutral-900',
    coverPatternColor: 'text-cyan-400',
    description: 'The absolute state-of-the-art textbook on neural cognitive computing paradigms.',
    synopsis: 'In her most ambitious project yet, Sarah Jenkins unpacks the detailed mathematical frameworks of transformers, diffusion pipelines, and brain-machine interface alignment. Filled with rich, deep-logic system layouts and elegant design diagrams.',
    pages: 610,
    publishedYear: 2026,
    language: 'English',
    stock: 20,
    isBestseller: true
  },
  {
    id: '27',
    title: 'Sacred Waterways of the East',
    author: 'Matteo Rossi',
    genre: 'History',
    price: 1750.00,
    rating: 4.8,
    coverBg: 'from-amber-950 via-yellow-950 to-stone-900',
    coverPatternColor: 'text-orange-300',
    description: 'Tracing ancient civilization conduits, river irrigation laws, and early copper trade logs.',
    synopsis: 'Famous historian Matteo Rossi traces the strategic power and seasonal trade fluctuations along early Middle-Eastern and Asian waterways. Using forgotten travel logs, he reconstructs ancient port tariffs and rich cultural interactions.',
    pages: 418,
    publishedYear: 2025,
    language: 'English',
    stock: 8,
    isBestseller: false
  },
  {
    id: '28',
    title: 'Wonders of the Celestial Sphere',
    author: 'Dr. Evelyn Carter',
    genre: 'Science',
    price: 2300.00,
    rating: 4.8,
    coverBg: 'from-violet-950 via-fuchsia-950 to-slate-950',
    coverPatternColor: 'text-purple-400',
    description: 'An majestic, beautifully structured astronomical catalog of cosmic matter and stellar dust.',
    synopsis: 'A lyrical, breathtaking companion piece to "Curiosities of the Sky". Evelyn Carter details planetary formations, deep-space cold fields, and mysterious radioactive signals captured along our galaxy\'s outer arms.',
    pages: 450,
    publishedYear: 2026,
    language: 'English',
    stock: 14,
    isBestseller: true
  },
  {
    id: '29',
    title: 'The Gastronomic Odyssey',
    author: 'Chef Hiroshi Tanaka',
    genre: 'Art & Culinary',
    price: 2450.00,
    rating: 4.9,
    coverBg: 'from-red-950 via-rose-950 to-stone-900',
    coverPatternColor: 'text-amber-500',
    description: 'The ancient art of cold fermentation, copper pots, and slow kitchen rituals.',
    synopsis: 'Hiroshi Tanaka blends exquisite custom kitchen sketches, seasonal harvest layouts, and advanced fermentation chemistry in this ultimate cookbook. A majestic ode to the peaceful art of slow meal crafting.',
    pages: 310,
    publishedYear: 2025,
    language: 'English',
    stock: 10,
    isBestseller: true
  },
  {
    id: '30',
    title: 'Echoes of the Renaissance Vault',
    author: 'Matteo Rossi',
    genre: 'Biography',
    price: 1990.00,
    rating: 4.7,
    coverBg: 'from-orange-950 via-stone-955 to-amber-900',
    coverPatternColor: 'text-amber-500',
    description: 'Unlocking the private sketchbooks and hidden letters of the master marble sculptors.',
    synopsis: 'This immersive, high-praise biography tracks the private letters, personal relationships, financial ledger entries and creative triumphs of legendary Renaissance stone-carving sculptors. Rossi crafts an intense, incredibly rich portrayal.',
    pages: 388,
    publishedYear: 2024,
    language: 'English',
    stock: 7,
    isBestseller: false
  }
];
