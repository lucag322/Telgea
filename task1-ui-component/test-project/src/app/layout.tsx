"use client";
import { UIProvider } from "./context/UIContext";
import HeaderWithContext from "./components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-selecta px-5 min-h-screen flex flex-col">
        <UIProvider>
          <HeaderWithContext />
          <main className="flex-1 flex flex-col">{children}</main>
        </UIProvider>
      </body>
    </html>
  );
}
