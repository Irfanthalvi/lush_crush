"use client";
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Layers, NotebookPen, List, Popsicle, Lollipop, Beaker, CupSoda, PillBottle, Sandwich, Cake, Gift } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const INITIAL_NAV_ITEMS = [
  { id: "creamy-range", to: "/creamy-range-popsicles", label: "Creamy-Range-Popsicles", Icon: NotebookPen },
  { id: "icy-range", to: "/icy-range-popsicles", label: "Icy-Range-Popsicles", Icon: Lollipop },
  { id: "cake-popsicles", to: "/cake-popsicles", label: "Cake-Popsicles", Icon: Popsicle },
  { id: "greek-yogurt", to: "/greek-yogurt-popsicles", label: "Greek-Yogurt-Popsicles", Icon: Lollipop },
  { id: "fruity-blitz", to: "/fruity-blitz-popsicles", label: "Fruity-Blitz-Popsicles", Icon: Popsicle },
  { id: "sugar-free", to: "/sugar-free-popsicles", label: "Sugar-Free-Popsicles", Icon: Lollipop },
  { id: "probiotics", to: "/probiotics-popsicles", label: "Probiotics-Popsicles", Icon: Popsicle },
  { id: "cup-for-one", to: "/cup-for-one", label: "Cup-For-One", Icon: CupSoda },
  { id: "tubs", to: "/tubs", label: "Tubs", Icon: Beaker },
  { id: "jars", to: "/jars", label: "Jars", Icon: PillBottle },
  { id: "sandwich", to: "/sandwich", label: "Sandwich", Icon: Sandwich },
  { id: "ice-cream-cakes", to: "/ice-cream-cakes", label: "Ice-Cream-Cakes", Icon: Cake },
  { id: "boxes", to: "/boxes", label: "Boxes", Icon: Gift },
  { id: "deals-for-all", to: "/deals-for-all", label: "Deals-For-All", Icon: List },
];

function SortableSidebarItem({ item, isSidebarOpen, closeSidebar }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
    touchAction: "none",
  };

  const IconComponent = item.Icon;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NavLink
        to={item.to}
        onClick={closeSidebar}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
           ${isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          }`
        }
      >
        <IconComponent size={20} className="shrink-0" />
        {isSidebarOpen && <span className="truncate">{item.label}</span>}
      </NavLink>
    </div>
  );
}

const Sidebar = ({ isSidebarOpen, isMobile, toggleSidebar, closeSidebar }) => {
  const [items, setItems] = useState(INITIAL_NAV_ITEMS);
  const navRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Boundary modifier: strictly limits dragging inside <nav> container bounds and locks x axis
  const restrictToNavContainer = ({ transform, draggingNodeRect }) => {
    if (!draggingNodeRect || !navRef.current) {
      return { ...transform, x: 0 };
    }
    const containerRect = navRef.current.getBoundingClientRect();
    const minY = containerRect.top - draggingNodeRect.top;
    const maxY = containerRect.bottom - draggingNodeRect.bottom;

    return {
      x: 0,
      y: Math.max(minY, Math.min(maxY, transform.y)),
    };
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((i) => i.id === active.id);
        const newIndex = prevItems.findIndex((i) => i.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300
        ${isMobile
          ? isSidebarOpen
            ? "translate-x-0 w-full max-w-[500px]"
            : "-translate-x-full w-full max-w-[260px]"
          : isSidebarOpen
            ? "w-[260px]" /* fixed width when open */
            : "w-[70px]" /* fixed width when collapsed */
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-[75px] border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sidebar-accent rounded-lg border border-sidebar-border shrink-0 text-sidebar-foreground">
            <Layers size={24} />
          </div>
          {isSidebarOpen && !isMobile && (
            <span className="font-monstrat-hadding text-lg font-semibold whitespace-nowrap overflow-hidden text-sidebar-foreground">
              LUSH CRUSH
            </span>
          )}
        </div>

        {isMobile && isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-lg font-bold shrink-0"
          >
            ✕
          </button>
        )}
      </div>

      {/* Links */}
      <nav ref={navRef} className="flex-1 px-1 py-4 space-y-2 overflow-y-auto relative">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToNavContainer]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableSidebarItem
                key={item.id}
                item={item}
                isSidebarOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
              />
            ))}
          </SortableContext>
        </DndContext>
      </nav>
    </aside>
  );
};

export default Sidebar;

