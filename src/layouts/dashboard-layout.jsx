import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "lucide-react";
import { closeDrawer } from "@/lib/drawerSlice";
import { increment, decrement, removeItem } from "@/lib/cartSlice";
import ItemDrawer from "@/components/subject/item-drawer";
import ProfileModal from "@/components/subject/profile-model";
import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }) => {
  const [screen, setScreen] = useState("desktop"); // "mobile" | "tablet" | "desktop"
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({ name: "IRFAN ALI", image: null });
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w < 768) setScreen("mobile");
      else if (w < 1024) setScreen("tablet");
      else setScreen("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // open / close sidebar depending on screen
  useEffect(() => {
    if (screen === "desktop") setIsSidebarOpen(true);
    else setIsSidebarOpen(false);
  }, [screen]);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // fake loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);
  const closeSidebar = () =>
    (screen === "mobile" || screen === "tablet") && setIsSidebarOpen(false);

  // ----- choose margin for main content -----
  const drawerOpen = useSelector((state) => state.drawer.open);
  const selectedItem = useSelector((state) => state.drawer.selectedItem);
  const cartItems = useSelector((state) => state.cart.items);

  const mainMargin = (() => {
    if (screen === "desktop") return isSidebarOpen ? "ml-[260px]" : "ml-[70px]";
    if (screen === "tablet") return isSidebarOpen ? "ml-[220px]" : "ml-0";
    return "ml-0"; // mobile
  })();

  const handleIncrement = (item) => {
    const target = item || selectedItem;
    if (!target) return;
    dispatch(increment({ id: target.id }));
  };

  const handleDecrement = (item) => {
    const target = item || selectedItem;
    if (!target) return;
    dispatch(decrement({ id: target.id }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground relative">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={screen === "mobile" || screen === "tablet"}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
        className="fixed left-0 top-0 h-full z-40"
      />

      {/* Overlay for mobile / tablet */}
      {(screen === "mobile" || screen === "tablet") && isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <main
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${mainMargin} ${drawerOpen ? 'mr-[420px]' : ''}`}
      >
        {/* Topbar */}
        <div className="sticky top-0 z-30 bg-background border-b">
          <Topbar
            toggleSidebar={toggleSidebar}
            dropdownRef={dropdownRef}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            setIsModalOpen={setIsModalOpen}
            profile={profile}
            isMobile={screen === "mobile"}
          />
        </div>

        {/* Scrollable page */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <Loader className="w-6 h-6 mr-2 animate-spin" />
              Loading page...
            </div>
          ) : (
            children || <Outlet />
          )}
        </div>
      </main>

      {/* Global Item Details Drawer */}
      <ItemDrawer
        open={drawerOpen}
        onClose={() => dispatch(closeDrawer())}
        item={selectedItem}
        cartItems={cartItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        onDone={() => dispatch(closeDrawer())}
        onCancel={() => dispatch(closeDrawer())}
      />

      {/* Profile modal */}
      {isModalOpen && (
        <ProfileModal setIsModalOpen={setIsModalOpen} setProfile={setProfile} />
      )}
    </div>
  );
};

export default DashboardLayout;
