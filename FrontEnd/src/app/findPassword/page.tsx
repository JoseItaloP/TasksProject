"use client";

import { useState } from "react";
import LoadingPage from "../_constructor/LoadingPage";
import { ErroType } from "../_constructor/_Types";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import PassHamdler from "./PassHamdler";

export default function FindPassword() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState<ErroType[]>([]);
  const [pass, setPass] = useState(false)
  const router = useRouter();

  async function hamdleSubmit() {
    setLoading(true);
    if (userEmail) {
        const findPassword = await PassHamdler(userEmail)
        if (findPassword) {
            if(Array.isArray(findPassword)){
                setLoading(false);
                setErros(findPassword)
                setTimeout(() => {
                    setErros((prev) => prev.filter((e) => e.id !== findPassword[0].id)); 
        
                }, 5000);
            }else{
                setPass(true)
                setLoading(false)
            }

      } else {
        setLoading(false);
        const Erros: ErroType[] = []
        Erros.push({id: Date.now(), message: 'Email não encontrado.'})
        setErros(Erros)
        setTimeout(() => {
          setErros((prev) => prev.filter((e) => e.id !== Erros[0].id)); 

        }, 5000);
        
      }
    } else {
      setLoading(false);
      const erros: ErroType[] = [];
      erros.push({
        id: Date.now(),
        message: "Preencha o Email para continuar.",
      });
      setErros(erros);
      setTimeout(() => {
        setErros((prev) => prev.filter((e) => e.id !== erros[0].id));
      }, 5000);
    }
  }
  if(pass){
    return (
        <main className="h-full w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-4">A sua senha foi restaurada, verifique seu Email para adquirir a nova senha!</h1>
            <button onClick={()=>router.replace('/Login')} className="w-1/5 bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900"
          >Voltar para Login!</button>
        </main>
    )
  }else{
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      {loading ? <LoadingPage absolt={true} /> : ""}
      <div className="absolute top-0">
        {erros.map((erro) => (
          <div
            key={erro.id}
            className="w-full bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg mt-4 text-xl"
          >
            <p className="flex-1">{erro.message}</p>
            <IoIosClose
              className="cursor-pointer text-2xl ml-2"
              onClick={() =>
                setErros((prev) => prev.filter((e) => e.id !== erro.id))
              }
            />
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          hamdleSubmit();
        }}
        className="flex flex-col items-center"
      >
        <label className="flex flex-col items-center my-2">
          <h1 className="text-2xl mb-4">Forneça o seu Email para continuar</h1>
          <input
            type="text"
            name=""
            id=""
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-2 text-cold-800 bg-hot-700 border border-cold-800 rounded"
          />
        </label>
        <input type="submit" value="Resgatar Senha" className="w-3/5 bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900"/>
      </form>
    </main>
  );
    }
}
