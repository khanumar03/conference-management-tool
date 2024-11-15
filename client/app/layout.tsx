import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import TRPCProvider from "@/components/trpc/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conference Management Tool",
  description: "working",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
      <SessionProvider session={session}>
        <html lang="en">
          <body className={cn(inter.className, "antialiased min-h-screen")}>
            <TRPCProvider>
                {children}
            </TRPCProvider>
          </body>
        </html>
      </SessionProvider>
  );
}
