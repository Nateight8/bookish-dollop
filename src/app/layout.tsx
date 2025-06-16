import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import AppBar from "~/components/nav/appbar";
import AppBarV2 from "~/components/nav/appbar-v2";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "Disconnect",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Montserrat({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-noise relative">
        <AppBarV2 session={session} />
        <main>{children}</main>
        <footer className="h-14">{/* Footer content will go here */}</footer>
      </body>
    </html>
  );
}
