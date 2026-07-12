import React from "react";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
// z-20 ensures drawer stays BELOW the sidebar (z-50) and topbar (z-30)

/**
 * ItemDrawer - ek inline right-side panel jo sidebar ke neeche aata hai
 * Vaul Drawer use nahi karta taake sidebar ke upar na aaye
 * Multiple items track karta hai table format mein
 */
const ItemDrawer = ({
  open,
  onClose,
  item,
  cartItems,           // { [id]: { item, count } }
  onIncrement,
  onDecrement,
  onRemove,
  onDone,
  onCancel,
}) => {
  // cartItems array mein convert karo sirf wo jo count > 0
  const cartList = Object.values(cartItems || {}).filter((c) => c.count > 0);
  const totalItems = cartList.reduce((sum, c) => sum + c.count, 0);

  if (!open) return null;

  return (
    <>
      {/* Backdrop - sirf mobile pe overlay dikhao, sidebar ke upar nahi */}
      <div
        className="fixed inset-0 z-20 bg-black/20 md:hidden"
        onClick={onCancel}
      />

      {/* Drawer Panel - right side, sidebar ke neeche */}
      <div
        className={`
          fixed top-[75px] right-0 bottom-0 z-20
          w-full sm:w-[420px]
          bg-background border-l border-border
          flex flex-col
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary" />
            <h2 className="text-lg font-bold font-monstrat-hadding text-foreground">
              Cart
            </h2>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onCancel}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Selected Item Preview */}
        {item && (
          <div className="flex items-center gap-3 px-5 py-3 bg-muted/40 border-b border-border flex-shrink-0">
            <div className="h-12 w-12 rounded-md overflow-hidden border border-border flex-shrink-0">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/fallback-image.png";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold font-monstrat-hadding truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground truncate">{item.label}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onDecrement}
                disabled={(cartItems?.[item.id]?.count || 0) <= 0}
                className="h-7 w-7 flex items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-semibold text-sm">
                {cartItems?.[item.id]?.count || 0}
              </span>
              <button
                onClick={onIncrement}
                className="h-7 w-7 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Cart Table */}
        <div className="flex-1 overflow-y-auto">
          {cartList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
              <ShoppingCart size={40} className="opacity-30" />
              <p className="text-sm font-roboto-para">Cart is empty</p>
              <p className="text-xs opacity-70">Click on items to add them</p>
            </div>
          ) : (
            <div className="p-4">
              {/* Table Header */}
              <div className="grid grid-cols-[2fr_1fr_auto] gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border mb-1">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="w-8"></span>
              </div>

              {/* Table Rows */}
              <div className="space-y-1">
                {cartList.map(({ item: cartItem, count }) => (
                  <div
                    key={cartItem.id}
                    className={`
                      grid grid-cols-[2fr_1fr_auto] gap-2 items-center
                      px-3 py-2.5 rounded-lg
                      transition-colors
                      ${item?.id === cartItem.id ? "bg-accent/60 border border-border" : "hover:bg-muted/60"}
                    `}
                  >
                    {/* Item Info + Mini Image */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-9 w-9 rounded-md overflow-hidden border border-border flex-shrink-0">
                        <img
                          src={cartItem.img}
                          alt={cartItem.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/fallback-image.png";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium font-monstrat-hadding truncate leading-tight">
                          {cartItem.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {cartItem.label}
                        </p>
                      </div>
                    </div>

                    {/* Qty Controls */}
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onDecrement(cartItem)}
                        disabled={count <= 0}
                        className="h-6 w-6 flex items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40 transition-colors text-xs"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-5 text-center font-bold text-sm">
                        {count}
                      </span>
                      <button
                        onClick={() => onIncrement(cartItem)}
                        className="h-6 w-6 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors text-xs"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <div className="w-8 flex justify-end">
                      <button
                        onClick={() => onRemove(cartItem)}
                        className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Done / Cancel */}
        <div className="flex-shrink-0 flex gap-3 px-5 py-4 border-t border-border bg-background">
          <Button
            variant="outline"
            className="flex-1 font-monstrat-hadding"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 font-monstrat-hadding"
            onClick={onDone}
            disabled={cartList.length === 0}
          >
            Done
            {totalItems > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary-foreground/20 text-xs">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemDrawer;
