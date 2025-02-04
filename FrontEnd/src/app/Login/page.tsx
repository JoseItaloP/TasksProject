'use client';

import { useContext, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { ErroType, newLoginUser } from "../_constructor/_Types";
import LoadingPage from "../_constructor/LoadingPage";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash  } from "react-icons/fa";


export default function Login() {
  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  const [typeP, setTypeP] = useState('password')
  const [eye, setEye] = useState(false)
 
  const [erros, setErros] = useState<ErroType[]>([]);
  
  const {userHeader, singIn, loading} = useContext(AuthContext)
  const router = useRouter()

  async function handleSubmit() {
    const NewUser: newLoginUser = { UserName, Password }
      const LoginErro = await singIn(NewUser) 
      if(LoginErro){
          setErros(LoginErro)
          setTimeout(() => {
            setErros((prev) => prev.filter((e) => e.id !== LoginErro[0].id)); 
          }, 5000);
      }
    
  }
  if(userHeader){
    return(
      <main className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-2">Você já esta logado!</h1>
        <h2 className="text-xl mb-2">Click abaixo para ir para sua pagina de tasks.</h2>
        <button onClick={()=>router.push('/User')} className="w-1/4 bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900">Minha pagina</button>
      </main>
    )
  }else{
    return (
      <main className="h-full w-full flex flex-col items-center justify-center">
        {loading ? <LoadingPage absolt={true} />
         : ''}
        <div className="absolute top-0" key={erros.length}>
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
  
        <section className="bg-cold-800 text-hot-700 h-2/4 max-[900px]:h-2/5 max-[800px]:h-2/4 max-[400px]:h-3/4 border  border-hot-900 rounded flex flex-col items-center  ">
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
                value={UserName}
                onChange={(e)=>setUserName(e.target.value)}
              />
            </label>
  
            <label className="flex flex-col ">
              <h2 className="text-xl">Senha:</h2>

              <div className="flex items-center justify-end">

              <input
                type={typeP}
                name="senha"
                id="senha"
                className="text-xl p-1 rounded bg-cold-900 text-hot-700 
                
                "
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {eye ? 
              <FaEyeSlash 
              className="absolute z-10 mr-2"
              onClick={()=>{
                setEye(!eye)
                setTypeP('password')}} />
              : 
              <FaEye  
              className="absolute z-10 mr-2"
              onClick={()=>{
                setEye(!eye)
                setTypeP('text')}}/>
            }
              </div>
            </label>
  
            <button
              type="submit"
              className="w-full bg-cold-900 text-hot-800 p-2 mb-4 buttonHAnimation max-[800px]:mt-4"
            >
              Enviar
            </button>
          </form>
        </section>
  
        <section className="flex flex-col items-center">
          <h1 className="text-xl my-2">Não possui conta?</h1>
          <button
          onClick={()=>router.push('/newUser')}
            className="mb-2 w-3/4 bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900"
          >
            Registre-se!
          </button>
          <div className="flex ">

          <button
          onClick={()=>router.push('/findEmail')}
            className="mr-1 w-3/4 bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900"
          >
            Esqueci o Email
          </button>
          <button
          onClick={()=>router.push('/findPassword')}
            className="ml-1 w-3/4 bg-hot-800 text-cold-900 p-3 buttonHAnimationINV text-center rounded border border-cold-900"
          >
            Esqueci a Senha
          </button>
          </div>
        </section>
      </main>
    );
  }
}
