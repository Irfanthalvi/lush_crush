import React from "react";
import { X, Plus, Minus, Trash2, ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ItemDrawer - Desktop: right-side panel | Mobile: bottom sheet
 * Mobile pe FAB se khulay ga
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
  isMobile,
}) => {
  const cartList = Object.values(cartItems || {}).filter((c) => c.count > 0);
  const totalItems = cartList.reduce((sum, c) => sum + c.count, 0);

  if (!open) return null;

  // ─── MOBILE: Bottom Sheet ──────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onCancel}
        />

        {/* Bottom Sheet */}
        <div
          className={`
            fixed bottom-0 left-0 right-0 z-50
            bg-background border-t border-border
            rounded-t-2xl shadow-2xl
            flex flex-col
            max-h-[85vh]
            transition-transform duration-300 ease-out
            ${open ? "translate-y-0" : "translate-y-full"}
          `}
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingCart data-cart-icon size={20} className="text-primary transition-transform duration-200" />
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
                  className="h-8 w-8 flex items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-semibold text-sm">
                  {cartItems?.[item.id]?.count || 0}
                </span>
                <button
                  onClick={onIncrement}
                  className="h-8 w-8 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Cart List - scrollable */}
          <div className="flex-1 overflow-y-auto">
            {cartList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground">
                <ShoppingCart size={36} className="opacity-30" />
                <p className="text-sm font-roboto-para">Cart is empty</p>
                <p className="text-xs opacity-70">Tap on items to add them</p>
              </div>
            ) : (
              <div className="p-4">
                <div className="grid grid-cols-[2fr_1fr_auto] gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border mb-1">
                  <span>Item</span>
                  <span className="text-center">Qty</span>
                  <span className="w-8" />
                </div>
                <div className="space-y-1">
                  {cartList.map(({ item: cartItem, count }) => (
                    <div
                      key={cartItem.id}
                      className={`
                        grid grid-cols-[2fr_1fr_auto] gap-2 items-center
                        px-3 py-2.5 rounded-lg transition-colors
                        ${item?.id === cartItem.id ? "bg-accent/60 border border-border" : "hover:bg-muted/60"}
                      `}
                    >
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
                          <p className="text-sm font-medium font-monstrat-hadding truncate leading-tight">{cartItem.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{cartItem.label}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onDecrement(cartItem)}
                          disabled={count <= 0}
                          className="h-6 w-6 flex items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40 transition-colors text-xs"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-5 text-center font-bold text-sm">{count}</span>
                        <button
                          onClick={() => onIncrement(cartItem)}
                          className="h-6 w-6 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors text-xs"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
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
            >
              Done
            </Button>
          </div>
        </div>
      </>
    );
  }

  // ─── DESKTOP: Right-side Inline Panel ────────────────────────────────────
  return (
    <>
      {/* Backdrop - only on small screens */}
      <div
        className="fixed inset-0 z-20 bg-black/20 md:hidden"
        onClick={onCancel}
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed top-[75px] right-0 bottom-0 z-20
          w-full sm:w-[420px]
          bg-background/90 border-l border-border
          flex flex-col
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart data-cart-icon size={20} className="text-primary transition-transform duration-200" />
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
              <div className="grid grid-cols-[2fr_1fr_auto] gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border mb-1">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="w-8" />
              </div>
              <div className="space-y-1">
                {cartList.map(({ item: cartItem, count }) => (
                  <div
                    key={cartItem.id}
                    className={`
                      grid grid-cols-[2fr_1fr_auto] gap-2 items-center
                      px-3 py-2.5 rounded-lg transition-colors
                      ${item?.id === cartItem.id ? "bg-accent/60 border border-border" : "hover:bg-muted/60"}
                    `}
                  >
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
                        <p className="text-sm font-medium font-monstrat-hadding truncate leading-tight">{cartItem.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{cartItem.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onDecrement(cartItem)}
                        disabled={count <= 0}
                        className="h-6 w-6 flex items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40 transition-colors text-xs"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-5 text-center font-bold text-sm">{count}</span>
                      <button
                        onClick={() => onIncrement(cartItem)}
                        className="h-6 w-6 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors text-xs"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
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
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemDrawer;
