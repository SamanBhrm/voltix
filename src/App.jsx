
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  ArrowUpRight,
  Star,
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Gamepad2,
  Zap,
  Menu,
  X,
  Check,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    category: "Phones",
    description: "256GB · Natural Titanium",
    price: 1099,
    oldPrice: 1199,
    rating: 4.9,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    category: "Audio",
    description: "Wireless · Noise Cancelling",
    price: 349,
    oldPrice: 399,
    rating: 4.8,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    category: "Computers",
    description: "13-inch · 16GB RAM · 512GB",
    price: 1299,
    oldPrice: null,
    rating: 4.9,
    badge: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Apple Watch Series 10",
    category: "Wearables",
    description: "GPS · Jet Black Aluminium",
    price: 399,
    oldPrice: 429,
    rating: 4.7,
    badge: "",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    name: "Samsung Galaxy S25",
    category: "Phones",
    description: "256GB · Phantom Black",
    price: 899,
    oldPrice: null,
    rating: 4.8,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Gaming Headset",
    category: "Audio",
    description: "Wireless · Surround Sound",
    price: 149,
    oldPrice: 179,
    rating: 4.6,
    badge: "",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 7,
    name: "Gaming Laptop",
    category: "Computers",
    description: "16GB RAM · RTX Graphics",
    price: 1499,
    oldPrice: 1699,
    rating: 4.8,
    badge: "HOT DEAL",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 8,
    name: "Smart Watch",
    category: "Wearables",
    description: "Fitness Tracking · AMOLED",
    price: 229,
    oldPrice: null,
    rating: 4.5,
    badge: "",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=85",
  },
];

const categories = [
  { name: "All Products", icon: Zap, value: "All" },
  { name: "Smartphones", icon: Smartphone, value: "Phones" },
  { name: "Audio", icon: Headphones, value: "Audio" },
  { name: "Computers", icon: Laptop, value: "Computers" },
  { name: "Wearables", icon: Watch, value: "Wearables" },
  { name: "Gaming", icon: Gamepad2, value: "Gaming" },
];

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

function Cart({
  items,
  onClose,
  onUpdateQuantity,
  onRemove,
}) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal === 0 || subtotal >= 100 ? 0 : 9.99;

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end bg-black/70 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0d111c] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="text-lg font-bold">Your Cart</h2>
            <p className="mt-1 text-xs text-slate-400">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <ShoppingBag size={42} className="text-slate-500" />
            <h3 className="mt-5 text-lg font-bold">
              Your cart is empty
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Add some products to get started.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-white/10 p-3"
                >
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.category}
                        </p>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <div className="flex items-center gap-3 rounded-lg border border-white/10 px-2 py-1.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, -1)
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="text-sm font-bold">
                        {money(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 bg-[#0a0e17] p-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Shipping</span>
                <span className={shipping === 0 ? "text-emerald-400" : ""}>
                  {shipping === 0 ? "Free" : money(shipping)}
                </span>
              </div>

              {subtotal > 0 && subtotal < 100 && (
                <p className="text-xs text-violet-300">
                  Add {money(100 - subtotal)} more for free shipping.
                </p>
              )}

              <div className="flex justify-between border-t border-white/10 pt-4">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black">
                  {money(subtotal + shipping)}
                </span>
              </div>

              <button
                onClick={() =>
                  alert("Checkout is not connected yet.")
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 text-sm font-bold hover:bg-violet-500"
              >
                Continue to checkout
                <ArrowRight size={17} />
              </button>
              <p className="text-center text-xs text-slate-500">
                Demo store · No real payment is processed
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("voltix-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("voltix-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(""), 2500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const searchableText =
        `${product.name} ${product.category} ${product.description}`;

      return (
        matchesCategory &&
        searchableText.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, activeCategory]);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your cart!`);
  };

  const updateQuantity = (id, change) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const scrollToProducts = () => {
    setActiveCategory("All");
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080b12] text-slate-100">
      {/* Announcement */}
      <div className="bg-violet-600 px-4 py-2.5 text-center text-xs font-medium sm:text-sm">
        <Zap className="mr-1 inline" size={14} />
        Free shipping on orders over $100
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080b12]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
              <Zap size={23} fill="white" />
            </span>
            <span className="text-2xl font-black">
              volt<span className="text-violet-400">ix</span>.
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm hover:text-violet-400">
              Home
            </a>
            <a href="#products" className="text-sm text-slate-400 hover:text-white">
              Shop
            </a>
            <a href="#categories" className="text-sm text-slate-400 hover:text-white">
              Categories
            </a>
            <a href="#why-voltix" className="text-sm text-slate-400 hover:text-white">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <label className="hidden w-48 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 lg:flex">
              <Search size={17} className="shrink-0 text-slate-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
            </label>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 md:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-white/10 bg-[#0d1220] px-5 py-4 md:hidden">
            {[
              ["Home", "#home"],
              ["Shop", "#products"],
              ["Categories", "#categories"],
              ["About", "#why-voltix"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}

            <label className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 px-3 py-3">
              <Search size={17} className="text-slate-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 top-20 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-24">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-4 py-2 text-xs font-medium text-violet-300">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                THE NEXT GENERATION OF TECH
              </div>

              <h1 className="text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Technology
                <br />
                that moves
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  you forward.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                Discover the latest gadgets, powerful devices, and
                everyday tech essentials. Your next favorite device
                is waiting.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  onClick={scrollToProducts}
                  className="group inline-flex items-center gap-3 rounded-xl bg-violet-600 px-6 py-4 text-sm font-bold shadow-xl shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-500"
                >
                  Explore products
                  <ArrowUpRight size={18} />
                </button>

                <a
                  href="#categories"
                  className="rounded-xl border border-white/10 px-6 py-4 text-sm font-semibold text-slate-300 hover:bg-white/5"
                >
                  Browse categories
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/[0.08] pt-8">
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="mt-1 text-xs text-slate-500">Tech products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">4.9/5</p>
                  <p className="mt-1 text-xs text-slate-500">Customer rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="mt-1 text-xs text-slate-500">Customer support</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-10 rounded-full bg-violet-600/20 blur-[90px]" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1b2035] via-[#101525] to-[#0c101b] p-5 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-violet-300">
                      FEATURED DEVICE
                    </p>
                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                      Built for more.
                    </h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                    New
                  </span>
                </div>

                <div className="my-6 flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-[#0b0e18]">
                  <img
                    src={products[0].image}
                    alt={products[0].name}
                    className="h-full w-full object-contain p-3 transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold sm:text-xl">
                      iPhone 16 Pro
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Power meets precision.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-amber-400">
                      <Star size={15} fill="currentColor" />
                      <span className="text-sm font-semibold text-white">4.9</span>
                      <span className="text-xs text-slate-500">(2.4k reviews)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black">$1,099</p>
                    <button
                      onClick={() => addToCart(products[0])}
                      className="mt-3 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-violet-200 sm:text-sm"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-violet-400">
                  FIND YOUR TECH
                </p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Shop by category
                </h2>
              </div>
              <button
                onClick={scrollToProducts}
                className="hidden text-sm text-slate-400 hover:text-violet-300 sm:block"
              >
                View all products ↗
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.value;

                return (
                  <button
                    key={category.value}
                    onClick={() => {
                      setActiveCategory(category.value);
                      document.getElementById("products")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`flex min-h-32 flex-col items-start justify-between rounded-2xl border p-4 text-left transition sm:p-5 ${
                      isActive
                        ? "border-violet-500/50 bg-violet-500/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:-translate-y-1 hover:border-violet-500/30"
                    }`}
                  >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-violet-500 text-white"
                        : "bg-white/[0.06] text-slate-300"
                    }`}>
                      <Icon size={21} />
                    </span>
                    <span className="mt-5 text-sm font-semibold text-slate-200">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-violet-400">
                  CURATED FOR YOU
                </p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Discover our products
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Thoughtfully selected tech for everyday life.
                </p>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:w-64 lg:hidden">
                <Search size={17} className="shrink-0 text-slate-500" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
              </label>
            </div>

            <div className="mb-7 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    activeCategory === category.value
                      ? "border-violet-500 bg-violet-600 text-white"
                      : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="mb-5 flex items-center justify-between text-sm">
              <p className="text-slate-500">
                Showing <span className="font-semibold text-slate-300">{filteredProducts.length}</span> products
              </p>
              <span className="text-xs text-slate-500">Prices in USD</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d111c] transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20"
                  >
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-950">
                      {product.badge && (
                        <span className="absolute left-3 top-3 z-10 rounded-md border border-white/10 bg-black/50 px-2.5 py-1.5 text-[9px] font-bold tracking-wider">
                          {product.badge}
                        </span>
                      )}

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-110"
                      />

                      <button
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                        className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-xl bg-white text-slate-950 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-400">
                          {product.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Star size={13} fill="#fbbf24" className="text-amber-400" />
                          {product.rating}
                        </span>
                      </div>

                      <h3 className="mt-3 truncate text-base font-bold transition group-hover:text-violet-300">
                        {product.name}
                      </h3>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {product.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-4">
                        <div>
                          <p className="text-lg font-extrabold">{money(product.price)}</p>
                          {product.oldPrice && (
                            <p className="text-xs text-slate-500 line-through">
                              {money(product.oldPrice)}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2.5 text-xs font-bold text-violet-300 transition hover:bg-violet-600 hover:text-white"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
                <Search size={32} className="mx-auto text-slate-600" />
                <h3 className="mt-4 text-lg font-bold">No products found</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try another search or category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* About */}
        <section id="why-voltix" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#15172a] to-[#0d111c] p-7 sm:p-12 lg:p-16">
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-[0.2em] text-violet-400">
                  THE VOLTIX DIFFERENCE
                </p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Better tech.
                  <br />
                  Better everyday.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  Great technology should feel simple. We bring together
                  carefully selected devices, clear pricing, and helpful
                  service in one place.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Zap,
                    title: "Quality first",
                    description: "A carefully curated selection of tech essentials.",
                  },
                  {
                    icon: Check,
                    title: "Easy shopping",
                    description: "A clean experience designed around your needs.",
                  },
                  {
                    icon: Headphones,
                    title: "Here to help",
                    description: "Support when you need help choosing your next device.",
                  },
                ].map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-white/[0.08] bg-black/20 p-5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Icon size={21} />
                      </div>
                      <h3 className="mt-5 font-bold">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-6 sm:flex-row sm:items-center sm:p-9">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Stay ahead of the tech curve.
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  New arrivals, useful gear, and product highlights.
                </p>
              </div>
              <button
                onClick={() => setNotice("Newsletter signup is coming soon.")}
                className="shrink-0 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold hover:bg-violet-500"
              >
                Stay in the loop <ArrowUpRight className="ml-1 inline" size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#06080e]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <a href="#home" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Zap size={17} fill="white" />
            </span>
            <span className="text-lg font-black">
              volt<span className="text-violet-400">ix</span>.
            </span>
          </a>
          <p className="text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Voltix. Built for tech lovers.
          </p>
          <a href="#home" className="text-sm text-slate-400 hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>

      {/* Cart */}
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}

      {/* Toast */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-violet-400/20 bg-[#171b2b] px-5 py-4 text-sm font-medium shadow-2xl"
        >
          <Check size={20} className="shrink-0 text-emerald-400" />
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Close notification"
            className="ml-auto text-slate-400 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
