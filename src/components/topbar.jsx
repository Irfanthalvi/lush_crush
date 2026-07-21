import { FaChevronDown } from "react-icons/fa";
import { LogOut, Settings, Sun, Moon } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import Breadcrumbs from "@/components/subject/breadcrumbs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/useTheme";

const Topbar = ({ toggleSidebar, setIsModalOpen, profile }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[75px] px-4 border-b border-border bg-background">
      {/* Left Section */}
      <div className="flex items-center justify-center gap-4 min-w-0">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="shrink-0"
        >
          ☰
        </Button>
        <div className="flex items-center h-10 overflow-hidden">
          <Breadcrumbs />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          id="theme-toggle-btn"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="shrink-0 rounded-full border-border hover:bg-accent hover:text-accent-foreground"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-amber-400 fill-amber-400/20" />
          ) : (
            <Moon size={18} className="text-foreground" />
          )}
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={profile.image || "/images/profile.png"} />
                <AvatarFallback className="bg-muted text-muted-foreground font-bold">U</AvatarFallback>
              </Avatar>
              <span className="hidden md:flex items-center text-sm font-medium text-foreground max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap font-monstrat-hadding">
                {profile.name}
                <FaChevronDown className="ml-1 text-muted-foreground" />
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44 rounded-md border border-border bg-popover text-popover-foreground shadow-md"
          >
            <DropdownMenuItem
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 cursor-pointer focus:bg-accent focus:text-accent-foreground"
            >
              <CgProfile size={18} />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => (window.location.href = "/setting")}
              className="flex items-center gap-2 cursor-pointer focus:bg-accent focus:text-accent-foreground"
            >
              <Settings size={18} />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => (window.location.href = "/login")}
              className="flex items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
