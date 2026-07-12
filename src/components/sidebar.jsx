"use client";
import { NavLink } from "react-router-dom";
import { Layers, NotebookPen, List, Popsicle, Lollipop, Beaker, CupSoda, PillBottle, Sandwich, Cake, Gift } from "lucide-react";

const Sidebar = ({ isSidebarOpen, isMobile, toggleSidebar, closeSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full bg-background border-r border-border flex flex-col transition-all duration-300
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
      <div className="flex items-center justify-between px-4 h-[75px] border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-lg border border-border shrink-0">
            <Layers size={24} />
          </div>
          {isSidebarOpen && !isMobile && (
            <span className="font-monstrat-hadding text-lg font-semibold whitespace-nowrap overflow-hidden">
              LUSH CRUSH <span className="text-[#D0021B]"></span>
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
      <nav className="flex-1 px-1 py-4 space-y-2 overflow-y-auto">
        <NavLink
          to="/creamy-range-popsicles"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <NotebookPen size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Creamy-Range-Popsicles</span>}
        </NavLink>

        <NavLink
          to="/icy-range-popsicles"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Lollipop size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Icy-Range-Popsicles</span>}
        </NavLink>
        <NavLink
          to="/cake-popsicles"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Popsicle size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Cake-Popsicles</span>}
        </NavLink>
        <NavLink
          to="/greek-yogurt-popsicles"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Lollipop size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Greek-Yogurt-Popsicles</span>}
        </NavLink>
        <NavLink
          to="/fruity-blitz-popsicles"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Popsicle size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Fruity-Blitz-Popsicles</span>}
        </NavLink>
        <NavLink
          to="/sugar-free-popsicles"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Lollipop size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Sugar-Free-Popsicles</span>}
        </NavLink>
        <NavLink
          to="/probiotics-popsicles"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Popsicle size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Probiotics-Popsicles</span>}
        </NavLink>
        <NavLink
          to="/cup-for-one"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <CupSoda size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Cup-For-One</span>}
        </NavLink>
        <NavLink
          to="/tubs"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Beaker size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Tubs</span>}
        </NavLink>
        <NavLink
          to="/jars"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <PillBottle size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Jars</span>}
        </NavLink>
        <NavLink
          to="/sandwich"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Sandwich size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Sandwich</span>}
        </NavLink>
        <NavLink
          to="/ice-cream-cakes"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Cake size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Ice-Cream-Cakes</span>}
        </NavLink>
        <NavLink
          to="/boxes"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Gift size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Boxes</span>}
        </NavLink>
        <NavLink
          to="/deals-for-all"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium font-monstrat-hadding transition-colors whitespace-nowrap overflow-hidden
             ${isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <List size={20} className="shrink-0" />
          {isSidebarOpen && <span className="truncate">Deals-For-All</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
