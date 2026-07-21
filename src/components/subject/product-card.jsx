import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { flyToCart } from "@/lib/flyToCart";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, setSelectedItem } from "@/lib/drawerSlice";
import { addItem, increment } from "@/lib/cartSlice";
import { useIsMobile } from "@/lib/useIsMobile";

const ProductCard = ({ subject }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isMobile = useIsMobile();

  const count = cartItems[subject.id]?.count || 0;

  const handleClick = (e) => {
    // Trigger flying card animation
    flyToCart(e.currentTarget);

    // Double-click / multi-click quantity logic:
    // First click: add item (x1). Subsequent clicks: increment item count (x2, x3...)
    if (cartItems[subject.id]) {
      dispatch(increment({ id: subject.id }));
    } else {
      dispatch(addItem({ item: subject }));
    }

    if (isMobile) {
      dispatch(setSelectedItem(subject));
    } else {
      dispatch(openDrawer(subject));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group bg-card text-card-foreground border rounded-md flex flex-col
        transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
        ${count > 0
          ? "border-primary ring-1 ring-primary"
          : "border-border"
        }
      `}
    >
      {/* Aspect Ratio Container for proportional width & height scaling */}
      <div className="aspect-[4/3] w-full overflow-hidden flex-shrink-0 relative">
        <img
          src={subject.img}
          alt={subject.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/fallback-image.png";
          }}
        />
        {/* Cart count badge */}
        {count > 0 && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow">
            {count}
          </span>
        )}
      </div>
      <div className="p-3 mt-auto">
        <Button className="w-full inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md transition">
          {subject.title} <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
