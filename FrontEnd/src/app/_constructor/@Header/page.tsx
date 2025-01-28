"use client";

import Link from "next/link";
import UserName from "./@UserName/page";
import {  AuthProvider } from "@/app/contexts/AuthContext";

export default function Header() {
  
  return (
    <AuthProvider>
      <header className="w-full bg-cold-900 border-b-hot-800 border-b p-4 mb-10 flex items-center justify-between">
        <h1>
          <Link href="/">Tasks</Link>
        </h1>

        <UserName  />
      </header>
    </AuthProvider>
  );
}
