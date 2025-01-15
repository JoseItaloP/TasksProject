import { redirect } from 'next/navigation'
import NewTask from "../_constructor/_Tasks/@NewTask/page"
import Tasks from "../_constructor/_Tasks/@Tasks/page"
import { getLogedLocal } from "../_constructor/UserValue"

export default async function Main() {
  const User = await getLogedLocal()
    if(User.ID == -1){
      redirect('/')
    }else {
    return (
      <main className="h-full flex flex-col justify-between">
          <h1 className="ml-2">Tarefas de {User.UserName}</h1>
          
          <NewTask />

          <Tasks />

      </main>
    )
  }
}