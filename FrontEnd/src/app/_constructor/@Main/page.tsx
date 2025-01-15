import Link from "next/link";


export default function Main() {
    return (
      <main className="h-full flex flex-col items-center justify-center">
        <section className="h-2/4 flex flex-col items-center">
          <h1 className="text-7xl">Aplicativo de Tarefas</h1>
          <h2 className="text-xl mt-4 mb-4">Para acessar suas tarefas e criar novas, entre com sua conta aqui: </h2>
          <Link href='/Login' className="
          w-auto
           bg-cold-900 text-hot-800 
           border border-hot-900 rounded 
           p-6 buttonHAnimation text-xl
           "> Login </Link>
        </section>
      </main>
    )
  }