
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const Cart = ({ items, onClose, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end bg-black/70 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0d111c] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Your Cart
              </h2>
              <p className="text-xs text-slate-500">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/[0.04] text-slate-500">
              <ShoppingCart size={34} />
            </div>

            <h3 className="mt-6 text-lg font-bold text-white">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Looks like you haven't added anything yet. Explore our
              products and find something you love.
            </p>

            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
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
                  className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3"
                >
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-white">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.category}
                        </p>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                      <div className="flex items-center gap-3 rounded-lg border border-white/10 px-2 py-1.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, -1)
                          }
                          aria-label="Decrease quantity"
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-4 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, 1)
                          }
                          aria-label="Increase quantity"
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="text-sm font-extrabold text-white">
                        {money(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 bg-[#0a0e17] p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-semibold text-white">
                  {money(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Shipping</span>
                <span className={shipping === 0 ? "font-semibold text-emerald-400" : "font-semibold text-white"}>
                  {shipping === 0 ? "Free" : money(shipping)}
                </span>
              </div>

              {subtotal > 0 && subtotal < 100 && (
                <p className="text-xs text-violet-300">
                  Add {money(100 - subtotal)} more for free shipping.
                </p>
              )}

              <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="font-bold text-white">Total</span>
                <span className="text-2xl font-black text-white">
                  {money(total)}
                </span>
              </div>

              <button
                onClick={() => {
                  alert("Checkout will be implemented in a future step.");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 text-sm font-bold text-white transition hover:bg-violet-500"
              >
                Continue to checkout
                <ArrowRight size={17} />
              </button>

              <p className="text-center text-xs text-slate-600">
                Shipping is free on orders over $100.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default Cart;
