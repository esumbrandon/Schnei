import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "@/lib/analytics";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Schnei - Take Control of Your Subscriptions",
  description: "Aggregate, track, and optimize all your recurring subscriptions in one beautiful dashboard. Save money and never miss a renewal.",
  keywords: "subscription management, recurring payments, save money, track subscriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <PostHogProvider>
          {children}
          <Toaster position="top-right" richColors />
        </PostHogProvider>
      </body>
    </html>
  );
}
