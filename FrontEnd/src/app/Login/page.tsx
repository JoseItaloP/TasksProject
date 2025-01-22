'use client';

import Link from "next/link";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { ErroType, newLoginUser } from "../_constructor/_Types";
import { loginAction } from "./LoginAction";
import { useRouter } from 'next/navigation'
import LoadingPage from "../_constructor/LoadingPage";


export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [erros, setErros] = useState<ErroType[]>([]);
  const [loading, setLoading] = useState(false)
  const router  = useRouter();

  async function handleSubmit() {
    const NewUser: newLoginUser = { userName, password}
    setLoading(true)
    const result = await loginAction(NewUser); 

    if (result) {
      setLoading(false)
      setErros(result)
      setTimeout(() => {
        setErros((prev) => prev.filter((e) => e.id !== result[0].id)); 
      }, 5000);

    }else{
      router.replace('/User')
    }
  }

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      {loading ? <LoadingPage /> : ''}
      <div className="absolute top-0">
        {erros.map((erro) => (
          <div
            key={erro.id}
            className="w-full bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg mt-4 text-xl"
          >
            <p className="flex-1">{erro.message}</p>
            <IoIosClose
              className="cursor-pointer text-2xl ml-2"
              onClick={() => setErros((prev) => prev.filter((e) => e.id !== erro.id))}
            />
          </div>
        ))}
      </div>

      <section className="bg-cold-800 text-hot-700 h-2/4 border border-hot-900 rounded flex flex-col items-center justify-between">
        <h1 className="my-1/4 text-2xl bg-cold-900 w-full p-2 rounded-t">
          Login
        </h1>

        <form
          className="flex flex-col justify-between h-full mt-4 px-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="flex flex-col ">
            <h2 className="text-xl">Username:</h2>
            <input
              type="text"
              name="usename"
              id="usename"
              className="text-xl p-1 rounded bg-cold-900 text-hot-700"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </label>

          <label className="flex flex-col ">
            <h2 className="text-xl">Senha:</h2>
            <input
              type="password"
              name="senha"
              id="senha"
              className="text-xl p-1 rounded bg-cold-900 text-hot-700"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-cold-900 text-hot-800 p-2 mb-4 buttonHAnimation"
          >
            Enviar
          </button>
        </form>
      </section>

      <section className="flex flex-col items-center">
        <h1 className="text-xl my-2">Não possui conta?</h1>
        <Link
          href={"/newUser"}
          className="w-full bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900"
        >
          Registre-se!
        </Link>
      </section>
    </main>
  );
}
