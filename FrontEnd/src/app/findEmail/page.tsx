"use client";

import { useState } from "react";
import LoadingPage from "../_constructor/LoadingPage";
import { ErroType } from "../_constructor/_Types";
import { IoIosClose } from "react-icons/io";
import EmailHamdler from "./EmailHamdler";
import { useRouter } from "next/navigation";

export default function FindEmail() {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState<ErroType[]>([]);
  const [email, setEmail] = useState("")
  const router = useRouter();

  async function hamdleSubmit() {
    setLoading(true);
    if (userName) {
      const findEmail: ErroType[] | string | null = await EmailHamdler(userName);
      if (findEmail) {
        if(Array.isArray(findEmail)){
            setLoading(false);
            setErros(findEmail)
            setTimeout(() => {
                setErros((prev) => prev.filter((e) => e.id !== findEmail[0].id)); 
      
              }, 5000);
        }else{
            setEmail(findEmail)
            setLoading(false)
        }

      } else {
        setLoading(false);
        const Erros: ErroType[] = []
        Erros.push({id: Date.now(), message: 'Usuário não encontrado.'})
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
        message: "Preencha o nome do usuário para continuar.",
      });
      setErros(erros);
      setTimeout(() => {
        setErros((prev) => prev.filter((e) => e.id !== erros[0].id));
      }, 5000);
    }
  }
  if(email.length > 0){
    return (
        <main className="h-full w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-4">Seu Email é <strong className="font-bold text-hot-900">{email}</strong></h1>
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
          <h1 className="text-2xl mb-4">Forneça o nome de Usuário para continuar</h1>
          <input
            type="text"
            name=""
            id=""
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 text-cold-800 bg-hot-700 border border-cold-800 rounded"
          />
        </label>
        <input type="submit" value="Resgatar Email" className="w-3/5 bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900"/>
      </form>
    </main>
  );
    }
}
