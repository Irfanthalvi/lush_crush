import React from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

const ItemDrawer = ({ open, onClose, item, count, onIncrement, onDecrement }) => {
  if (!item) return null;

  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-full sm:w-[450px] fixed right-0 top-0 bottom-0 border-l border-border bg-background flex flex-col p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-xl font-bold font-monstrat-hadding text-foreground">
              Item Details
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground text-sm font-roboto-para">
              Review and update the selected item quantity.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerClose asChild>
            <Button size="icon" variant="ghost" onClick={onClose} className="rounded-full">
              <X className="size-5" />
            </Button>
          </DrawerClose>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          <div className="w-full h-56 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
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

          <div className="space-y-2">
            <span className="inline-block text-xs font-semibold px-2 py-1 bg-accent text-accent-foreground rounded-full">
              {item.label}
            </span>
            <h3 className="text-2xl font-bold font-monstrat-hadding text-foreground">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm font-roboto-para">
              {item.description}
            </p>
          </div>

          <div className="py-4 border-y border-border flex items-center justify-between">
            <span className="font-medium text-foreground">Total Clicks / Quantity</span>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={onDecrement}
                disabled={count <= 0}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="size-4" />
              </Button>
              <span className="font-semibold text-lg min-w-[20px] text-center">
                {count}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={onIncrement}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="p-0 pt-4 border-t border-border">
          <Button onClick={onClose} className="w-full py-6 font-monstrat-hadding">
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ItemDrawer;
