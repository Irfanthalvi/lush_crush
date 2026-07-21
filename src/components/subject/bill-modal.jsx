import React, { useState } from "react";
import { Printer, X, ShoppingBag, CreditCard, Banknote, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BillModal = ({ open, onClose, cartItems, onCancelOrder }) => {
  const [paymentMode, setPaymentMode] = useState("cash"); // "cash" (15% tax) | "card" (8% tax)

  if (!open) return null;

  const itemList = Object.values(cartItems || {}).filter((c) => c.count > 0);
  const totalCount = itemList.reduce((sum, c) => sum + c.count, 0);

  const ITEM_BASE_PRICE = 390;
  const subtotal = itemList.reduce((sum, c) => {
    const price = c.item?.price || ITEM_BASE_PRICE;
    return sum + price * c.count;
  }, 0);

  const taxPercentage = paymentMode === "cash" ? 15 : 8;
  const taxAmount = Math.round((subtotal * taxPercentage) / 100);
  const grandTotal = subtotal + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const invoiceNumber = `LC-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Box / Printable Section */}
      <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none print:w-full print:max-w-none">
        
        {/* Modal Top Header (Hidden when Printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 print:hidden">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h3 className="font-bold text-lg font-monstrat-hadding text-foreground">
              Official Tax Invoice
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Payment Mode Selection (Hidden when Printing) */}
        <div className="px-6 pt-4 pb-2 border-b border-border bg-background print:hidden">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block font-monstrat-hadding">
            Select Payment Method (Tax Included)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMode("cash")}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-xl border font-medium text-sm transition-all
                ${paymentMode === "cash"
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
                }
              `}
            >
              <Banknote size={18} />
              <span>Cash (15% Tax)</span>
            </button>

            <button
              onClick={() => setPaymentMode("card")}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-xl border font-medium text-sm transition-all
                ${paymentMode === "card"
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
                }
              `}
            >
              <CreditCard size={18} />
              <span>Card (8% Tax)</span>
            </button>
          </div>
        </div>

        {/* ── RECEIPT CONTENT (PRINTABLE REGION) ── */}
        <div id="printable-receipt" className="flex-1 overflow-y-auto p-6 space-y-5 print:p-0 print:overflow-visible">
          {/* Receipt Branding */}
          <div className="text-center pb-4 border-b border-dashed border-border space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-primary font-monstrat-hadding">
              LUSH CRUSH
            </h1>
            <p className="text-xs text-muted-foreground">Premium Ice-Pops & Desserts</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 px-1">
              <span>Invoice: <strong className="text-foreground">{invoiceNumber}</strong></span>
              <span>Date: {currentDate}</span>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <div className="grid grid-cols-[3fr_1fr_1.5fr_1.5fr] gap-2 pb-2 text-xs font-bold uppercase text-muted-foreground border-b border-border">
              <span>Item</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            <div className="divide-y divide-border/60">
              {itemList.map(({ item, count }) => {
                const price = item?.price || ITEM_BASE_PRICE;
                return (
                  <div key={item.id} className="grid grid-cols-[3fr_1fr_1.5fr_1.5fr] gap-2 py-2.5 text-sm items-center">
                    <span className="font-medium font-monstrat-hadding truncate text-foreground">
                      {item.title}
                    </span>
                    <span className="text-center font-semibold text-muted-foreground">
                      {count}
                    </span>
                    <span className="text-right font-mono text-muted-foreground">
                      Rs. {price}
                    </span>
                    <span className="text-right font-mono font-semibold text-foreground">
                      Rs. {price * count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bill Summary Box */}
          <div className="bg-muted/40 rounded-xl p-4 space-y-2 border border-border">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Items Count:</span>
              <span className="font-bold text-foreground">{totalCount} pcs</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal:</span>
              <span className="font-mono font-medium text-foreground">Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Tax ({paymentMode === "cash" ? "Cash 15%" : "Card 8%"}):
              </span>
              <span className="font-mono font-medium text-foreground">+ Rs. {taxAmount}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-base font-bold text-foreground">
              <span>Grand Total:</span>
              <span className="font-mono text-lg text-primary">Rs. {grandTotal}</span>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground pt-2 italic">
            Thank you for visiting Lush Crush! Come back soon.
          </p>
        </div>

        {/* Modal Bottom Buttons (Hidden when Printing) */}
        <div className="p-4 border-t border-border bg-background flex gap-3 print:hidden">
          <Button
            variant="outline"
            onClick={onCancelOrder}
            className="flex-1 font-monstrat-hadding border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <X size={16} className="mr-1.5" />
            Cancel Order
          </Button>

          <Button
            onClick={handlePrint}
            className="flex-1 font-monstrat-hadding bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Printer size={16} className="mr-1.5" />
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
