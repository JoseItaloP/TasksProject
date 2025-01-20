"use client";

import Link from "next/link";
import UserName from "./@UserName/page";
import { UserType } from "../_Types";
import { ReturnUser } from "../UserValue";
import {  useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

export default function Header() {

  const [userLocal,setUserLocal] = useState<UserType>({
    ID: -1,
    UserName: "Guest",
    Password: "",
    Token: "",
    Email: "",
    created_at: new Date(),
    my_tasks: [],
  });
  const pathName = usePathname()
  useEffect(()=>{
    async function getUser() {
      setUserLocal(await ReturnUser());
      }
      getUser();
  }, [pathName])
  

  return (
    <header className="w-full bg-cold-900 border-b-hot-800 border-b p-4 mb-10 flex items-center justify-between">
      <h1>
        <Link href="/">Tasks</Link>
      </h1>

      {userLocal.ID === -1 ? <h2>{"User"}</h2> : <UserName userLocal={userLocal} />}
    </header>
  );
}
