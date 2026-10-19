
import { useState } from "react";
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export default function ProductDetails({
  product,
  onBack,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080b12] px-5 py-20 text-center text-white">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button
          onClick={onBack}
          className="mt-6 rounded-xl bg-violet-600 px-5 py-3"
        >
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080b12] px-5 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to products
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-950 p-6 sm:min-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[460px] w-full object-contain transition duration-500 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
              {product.category}
            </span>

            <h1 className="mt-4 text-3xl font-black sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-400">
              {product.description}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <Star
                size={18}
                fill="#fbbf24"
                className="text-amber-400"
              />
              <span className="font-bold">{product.rating}</span>
              <span className="text-sm text-slate-500">
                Customer rating
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <span className="text-3xl font-black">
                {money(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-slate-500 line-through">
                  {money(product.oldPrice)}
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-5 rounded-xl border border-white/10 px-4 py-3">
                <button
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                  className="text-slate-400 hover:text-white"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-5 text-center font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((current) => Math.min(99, current + 1))
                  }
                  aria-label="Increase quantity"
                  className="text-slate-400 hover:text-white"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={() => onAddToCart(product, quantity)}
                className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 font-bold text-white transition hover:bg-violet-500"
              >
                <ShoppingBag size={19} />
                Add to cart
              </button>
            </div>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-7">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Truck size={19} className="text-violet-400" />
                Free shipping on orders over $100
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <ShieldCheck size={19} className="text-violet-400" />
                Secure shopping experience
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <RotateCcw size={19} className="text-violet-400" />
                Review return terms before purchasing
              </div>
              <p className="flex items-center gap-2 text-xs text-emerald-400">
                <Check size={15} />
                Demo product · Availability is not verified
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
د