"use client";
import { redirect } from "next/navigation";
import { NewUserData } from "../_constructor/_Types";
// import { RegistratUser } from "../_constructor/UserValue";
import { useState } from "react";
import ErrorHandler from "../_constructor/ErrorBox";
import { ErroType } from "../_constructor/_Types";
import { IoIosClose } from "react-icons/io";
import NewUserResgistrat from "./_NewUserResgistrat";

export default function NewUser() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [confirme, setconfirme] = useState("");
  const [Email, setEmail] = useState("");
  const [EqualP, setEqualP] = useState(true);
  const [erros, setErros] = useState<ErroType[]>([]);

  function verifyPassword(e: string) {
    setconfirme(e);

    if (e !== Password) {
      console.log("Senha: ", Password);
      console.log("confirme: ", e);
      return setEqualP(false);
    }
    return setEqualP(true);
  }

  async function hamdleSubmit(){
    if (EqualP === false) {
      const newErro: ErroType = ErrorHandler().addError(
        "As senhas devem ser iguais"
      );
      setErros((previeusErro) => [...previeusErro, newErro]);
      setTimeout(() => {
        setErros((prevErros) => prevErros.filter((erro) => erro.id !== newErro.id));
      }, 5000);
      return
    }
    const NewUser: NewUserData = {
      Username,
      Password,
      Email,
    };
    const response = await NewUserResgistrat(NewUser)
    if(response){
      redirect('/')
    } else {
      const newErro: ErroType = ErrorHandler().addError(
        "Algo de errado ocorreu, tente mais tarde"
      );
      setErros((previeusErro) => [...previeusErro, newErro]);
      setTimeout(() => {
        setErros((prevErros) => prevErros.filter((erro) => erro.id !== newErro.id));
      }, 5000);
    }
  }


  return (
    <section
      className="bg-cold-900 border-x border-x-hot-900 
        h-full w-2/3 flex flex-col items-center"
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
      <h1 className="text-2xl mt-8">Registre-se</h1>
      <form
        className="flex flex-col justify-around h-full w-3/4"
        onSubmit={(e) => {
          e.preventDefault()
          hamdleSubmit()
        }}
      >
        <label className="flex flex-col">
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
        <label className="flex flex-col">
          <h2 className="text-xl">Password</h2>
          <input
            type="password"
            name="Password"
            id="Password"
            className="text-xl p-1 rounded bg-hot-700 text-cold-800"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <h2 className="text-xl">Comfirme a senha</h2>
          <input
            type="password"
            name="confirme"
            id="confirme"
            className="text-xl p-1 rounded bg-hot-700 text-cold-800"
            value={confirme}
            onChange={(e) => {
              setconfirme(e.target.value);
              verifyPassword(e.target.value);
            }}
          />
          {EqualP ? (
            ""
          ) : (
            <p className="text-red-500">As senhas não coinsciden entre si.</p>
          )}
        </label>
        <label className="flex flex-col">
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
        <input
          type="submit"
          value="Enviar"
          className="p-4 bg-hot-800 text-cold-900 buttonHAnimationINV border border-hot-900 rounded"
        />
      </form>
    </section>
  );
}
