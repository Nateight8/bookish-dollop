"use client";

import type React from "react";

import { ChevronDown, UserRound } from "lucide-react";
import { useState, useEffect, type Dispatch, type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { NavigationMenuLink } from "../ui/navigation-menu";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { Badge } from "../ui/badge";
import CartItems from "./shop/cart-items";
import AuthStatus from "../user/auth-status";
import type { Session } from "next-auth";

type NavItem = {
  label: string;
  hasDropdown?: boolean;
  badge?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

interface CartItem {
  id: string;
  bookName: string;
  author: string;
  cover: string;
  issueDate?: string;
  price?: string;
}

const cartItems: CartItem[] = [
  {
    id: "1",
    bookName: "The Midnight Library",
    author: "Matt Haig",
    cover: "/covers/5.jpg",
    issueDate: "2020-08-13",
    price: "$17.99",
  },
  {
    id: "2",
    bookName: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/covers/2.jpg",
    issueDate: "2021-05-04",
    price: "$12.99",
  },
  {
    id: "3",
    bookName: "Dune",
    author: "Frank Herbert",
    cover: "/covers/3.jpg",
    issueDate: "1965-08-01",
    price: "$18.99",
  },
  {
    id: "4",
    bookName: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "/covers/4.jpg",
    issueDate: "2019-02-05",
    price: "$15.99",
  },
];

const NAV_ITEMS: NavItem[] = [
  { label: "Shop" },
  { label: "For You" },
  { label: "Search" },
  { label: "E-Books" },
  //   { label: "Collections" },
  //   { label: "Blog" },
  //   { label: "Directory" },
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

  .navigation-menu-content {
    position: absolute !important;
    right: 0 !important;
    left: auto !important;
    transform-origin: top right !important;
  }
`;

export default function AppBarV2({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

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
    <div className="w-full relaive sticky bg-background top-0 z-50">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="flex h-14 items-center justify-between border-b relative z-20 md:px-8">
        {/* Menu Button with Hamburger to X Animation */}
        <div className=" md:hidden flex-1">
          <MenuButton open={open} setOpen={setOpen} />
        </div>

        {/* menu items hidden in mobile */}
        <div className="hidden md:flex flex-1 ">
          {NAV_ITEMS.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>

        {/* app logo */}
        <div className="flex-shrink-0 flex-1 flex items-center justify-center">
          <span className="text-lg font-semibold uppercase">Disconnect</span>
        </div>

        {/* right side hidden in md */}
        <div className="md:hidden flex-1 justify-end flex">
          <Button variant="ghost" size="icon" className="p-0 w-14 h-full">
            <UserRound className="size-6" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
        {/* right side shown in md */}
        <div className="flex-1 justify-end items-center hidden  h-full md:flex">
          <Menubar className="border-none p-0 bg-transparent h-full">
            <MenubarMenu>
              <MenubarTrigger className="p-0 h-full data-[state=open]:bg-muted">
                <div className="flex items-center px-4 py-2 hover:bg-muted cursor-pointer motion-safe-transition transition-colors duration-200">
                  <span className="text-sm">Help</span>
                </div>
              </MenubarTrigger>
              <MenubarContent
                sideOffset={0}
                align="end"
                className="rounded-none shadow-none"
              >
                <MenubarItem>Help Center</MenubarItem>
                <MenubarItem>Contact Us</MenubarItem>
                <MenubarItem>FAQs</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="p-0 h-full data-[state=open]:bg-muted">
                <div className="flex items-center px-4 py-2 hover:bg-muted cursor-pointer motion-safe-transition transition-colors duration-200">
                  <span className="text-sm">Account</span>
                </div>
              </MenubarTrigger>
              <MenubarContent
                sideOffset={0}
                align="end"
                className="rounded-none shadow-none w-96 p-0"
              >
                <AuthStatus session={session} />
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="p-0 h-full data-[state=open]:bg-muted">
                <div className="flex  items-center px-4 py-2 hover:bg-muted cursor-pointer motion-safe-transition transition-colors duration-200">
                  <span className="text-sm">Bag ( {cartItems.length} )</span>
                </div>
              </MenubarTrigger>
              <MenubarContent
                sideOffset={0}
                align="end"
                className="rounded-none shadow-none p-0 w-96"
              >
                <CartItems cartItems={cartItems || []} />
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      {/* Dropdown Menu with reduced motion support */}
      <div
        className={`fixed top-14 left-0 right-0 bottom-0 bg-background z-10 shadow-lg overflow-y-auto motion-safe-transition transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="min-h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>

          <div className="flex-shrink-0 py-4 px-6 bg-muted border-t ">
            <p className="text-center text-sm">
              &copy; {new Date().getFullYear()} Disconnect. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Overlay with reduced motion support */}
      {/* <div
        className={`fixed inset-0 motion-safe-transition transition-opacity duration-300 ease-in-out z-0 ${
          open ? "bg-opacity-20" : "bg-opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      /> */}
    </div>
  );
}

function NavItem({ label, hasDropdown, badge, icon, onClick }: NavItem) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-4 hover:bg-muted cursor-pointer motion-safe-transition transition-colors duration-200`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-lg md:text-sm whitespace-nowrap">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <Badge className="bg-foreground text-xs px-2 py-1 rounded">
            {badge}
          </Badge>
        )}
        {hasDropdown && (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
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
