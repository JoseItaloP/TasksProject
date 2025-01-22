import Link from 'next/link'
import React from 'react'

export default function redirectUser(){
  return (
    <main className='h-full flex flex-col items-center justify-center'>

        <h1 className='text-6xl mb-2 text-center'>Conta criada com sucesso</h1>
        <p className='text-xl w-3/4 text-center text-hot-400'>Veirifique sua caixa de email, você recebera sua senha inicial por lá.
        Retorne e clique em {'"'}Login{'"'} para proceguir
        </p>
        <Link href={'/Login'} className="
          w-40 mt-4 text-center
           bg-cold-900 text-hot-800 
           border border-hot-900 rounded 
           p-6 buttonHAnimation text-xl
           ">Login</Link>
    </main>
  )
}

