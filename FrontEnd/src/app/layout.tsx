import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_constructor/@Footer/page";
import Header from "./_constructor/@Header/page";

export const metadata: Metadata = {
  title: "Task App",
  description: "Create Tasks App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between h-screen">
        <Header/>

        {children}

        <Footer />
      </body>
    </html>
  );
}
