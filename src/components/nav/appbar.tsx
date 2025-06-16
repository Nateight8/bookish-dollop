"use client";

import { Search, User, ChevronDown } from "lucide-react";
import { useState, useEffect, type Dispatch, type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";

type NavItem = {
  label: string;
  hasDropdown?: boolean;
  badge?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Awards" },
  { label: "By Category" },
  { label: "By Technology" },
  { label: "Collections" },
  { label: "Blog" },
  { label: "Directory" },
];

const styles = `
  @media (prefers-reduced-motion: reduce) {
    .motion-safe-transition {
      transition: none !important;
      animation: none !important;
    }
    .motion-safe-transform {
      transform: none !important;
    }
  }
`;

export default function AppBar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="w-full relative">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="flex h-14 items-center justify-between border-b bg-background relative z-20">
        {/* Menu Button with Hamburger to X Animation */}
        <MenuButton open={open} setOpen={setOpen} />

        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-black">B.</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by Collections"
              className="pl-10 pr-4 py-2 w-full  border-0 rounded-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-gray-300 focus:bg-background"
            />
          </div>
        </div>

        {/* Profile Icon */}
        <Button variant="ghost" size="icon" className="p-0 w-14 h-full">
          <User className="size-7" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>

      {/* Dropdown Menu with reduced motion support */}
      <div
        className={`fixed top-14 left-0 right-0 bottom-0 bg-gray-100 z-10 shadow-lg overflow-y-auto motion-safe-transition transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="min-h-full flex flex-col">
          <div className="flex-shrink-0 px-4 py-4 border-b ">
            <span className="text-lg font-medium ">Explore</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>

          <div className="flex-shrink-0 py-4 px-6 bg-muted border-t ">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Disconnect. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Overlay with reduced motion support */}
    </div>
  );
}

function NavItem({ label, hasDropdown, badge, icon, onClick }: NavItem) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer motion-safe-transition transition-colors duration-200`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-lg text-gray-900">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <Badge className="bg-black text-white text-xs px-2 py-1 rounded">
            {badge}
          </Badge>
        )}
        {hasDropdown && <ChevronDown className="h-5 w-5 text-gray-600" />}
      </div>
    </div>
  );
}

function MenuButton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<boolean>;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="p-0 w-14 h-full"
      onClick={() => setOpen(!open)}
    >
      <div className="relative w-6 h-6 flex flex-col justify-center items-center">
        {/* Top line */}
        <span
          className={`block h-0.5 w-6 bg-current motion-safe-transition transition-all duration-300 ease-in-out ${
            open ? "rotate-45 translate-y-0" : "rotate-0 -translate-y-1.5"
          }`}
        />
        {/* Middle line */}
        <span
          className={`block h-0.5 w-6 bg-current motion-safe-transition transition-all duration-300 ease-in-out ${
            open ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />
        {/* Bottom line */}
        <span
          className={`block h-0.5 w-6 bg-current motion-safe-transition transition-all duration-300 ease-in-out ${
            open ? "-rotate-45 -translate-y-0" : "rotate-0 translate-y-1.5"
          }`}
        />
      </div>
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
    </Button>
  );
}
