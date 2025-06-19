import "~/styles/globals.css";

import { type Metadata } from "next";
import { Montserrat } from "next/font/google";
import AppBarV2 from "~/components/nav/appbar-v2";
import { auth } from "~/server/auth";
import QueryProvider from "~/components/providers/query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Disconnect",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="bg-noise flex min-h-screen flex-col relative">
        <QueryProvider>
          <AppBarV2 session={session} />
          <main className="flex-1">{children}</main>
          <Toaster position="bottom-right" richColors />
          <footer className="h-14 bg-foreground text-background">
            {/* Footer content will go here */}
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
