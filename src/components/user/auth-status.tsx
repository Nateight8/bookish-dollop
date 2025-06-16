"use client";
import { useId } from "react";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Book, LogOut, MapPin, Settings, UserRound } from "lucide-react";
import Link from "next/link";

export default function AuthStatus({ session }: { session: Session | null }) {
  if (!session?.user) {
    return <Unauthenticated />;
  }

  return <Authenticated user={session.user} />;
}

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

function Authenticated({ user }: { user: User }) {
  const authItems = [
    {
      label: "Account details",
      icon: UserRound,
      href: "#",
    },
    {
      label: "My orders",
      icon: Book,
      href: "#",
    },
    {
      label: "Address book",
      icon: MapPin,
      href: "#",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "#",
    },
    {
      label: "Sign out",
      icon: LogOut,
      href: "#",
    },
  ];

  return (
    <div className="w-full divide-y">
      {authItems.map((item, index) => (
        <AuthButton
          key={index}
          label={item.label}
          Icon={item.icon}
          href={item.href}
        />
      ))}
    </div>
  );
}

function Unauthenticated() {
  const id = useId();

  return (
    <>
      <div className="border-b pb-6 p-4">
        <div className="pb-4">
          <h3 className="text-md font-semibold">Sign in</h3>
        </div>
        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email address</Label>
              <Input
                className="rounded-none"
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                className="rounded-none"
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} />
              <Label
                htmlFor={`${id}-remember`}
                className="text-muted-foreground font-normal"
              >
                Remember me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Forgot password?
            </a>
          </div>
          <Button type="button" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
      <div className="pt-6 p-4">
        <h3 className="text-md font-semibold">New User?</h3>
        <p className="text-muted-foreground">
          Create an account to start reading.
        </p>
        <Button variant="default" className="w-full mt-6">
          Sign up
        </Button>
      </div>
    </>
  );
}

function AuthButton({
  label,
  Icon,
  href,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="h-14 hover:bg-muted items-center justify-start flex px-6 text-sm hover:cursor-pointer text-muted-foreground hover:text-foreground w-full"
    >
      <Icon className="size-4 mr-2" /> {label}
    </Link>
  );
}
