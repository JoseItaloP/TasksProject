import Link from "next/link";
import UserName from "./@UserName/page";
import { UserType } from "../_Types";
import { ReturnUser } from "../UserValue";

export default async function Header() {
  const UserLocal: UserType = await ReturnUser()

  return (
    <header className="w-full bg-cold-900 border-b-hot-800 border-b p-4 mb-10 flex items-center justify-between">
      <h1>
        <Link href="/">Tasks</Link>
      </h1>

      {UserLocal.ID === -1 ? <h2>{"User"}</h2> : UserName(UserLocal.UserName)}
    </header>
  );
}
