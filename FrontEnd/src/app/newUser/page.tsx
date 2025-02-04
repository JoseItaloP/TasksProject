"use client";
import { redirect } from "next/navigation";
import { NewUserData } from "../_constructor/_Types";
import { useState } from "react";
import { ErroType } from "../_constructor/_Types";
import { IoIosClose } from "react-icons/io";
import NewUserResgistrat from "./_NewUserResgistrat";

export default function NewUser() {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [ConfEmail, setConfEmail] = useState("");
  const [erros, setErros] = useState<ErroType[]>([]);

  async function hamdleSubmit(){
    
    const NewUser: NewUserData = {
      Username,
      Email,
      ConfEmail
    };
    const response = await NewUserResgistrat(NewUser)
    if(response){
      // setLoading(false)
      setErros(response)
      setTimeout(() => {
        setErros((prev) => prev.filter((e) => e.id !== response[0].id)); 
      }, 5000);
    } else {
      redirect('/Redirect')
    }
  }


  return (
    <section
      className="bg-cold-900 border-x border-x-hot-900 
        h-full w-2/3 flex flex-col items-center 
        max-[800px]:py-20 max-[800px]:w-3/4
        
        "
    >
      <div className="absolute">
        {erros.map((erro) => (
          <div
            key={erro.id}
            className="w-full bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg mt-4 text-xl"
          >
            <p className="flex-1">{erro.message}</p>
            <IoIosClose
              className="cursor-pointer text-2xl ml-2"
              onClick={() => setErros((prevErros) => prevErros.filter((erroE) => erroE.id !== erro.id))}
            />
          </div>
        ))}
      </div>
      <h1 className="text-2xl mt-8 max-[800px]:mt-8 max-[900px]:mt-16">Registre-se</h1>
      <form
        className="flex flex-col justify-around h-full w-3/4"
        onSubmit={(e) => {
          e.preventDefault()
          hamdleSubmit()
        }}
      >
        <label className="flex flex-col max-[800px]:my-2">
          <h2 className="text-xl">Username</h2>
          <input
            type="text"
            name="Username"
            id="Username"
            className="text-xl p-1 rounded bg-hot-700 text-cold-800"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col max-[800px]:my-2">
          <h2 className="text-xl">Email</h2>
          <input
            type="email"
            name="Email"
            id="Email"
            className="text-xl p-1 rounded bg-hot-700 text-cold-800"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col max-[800px]:my-2">
          <h2 className="text-xl">Confirme o Email</h2>
          <input
            type="email"
            name="Email"
            id="ConfEmail"
            className="text-xl p-1 rounded bg-hot-700 text-cold-800"
            value={ConfEmail}
            onChange={(e) => setConfEmail(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Enviar"
          className="p-4 bg-hot-800 text-cold-900 buttonHAnimationINV 
          border border-hot-900 rounded
          max-[800px]:mt-4
          "
        />
      </form>
    </section>
  );
}
