"use client"
import NewTask from "../_constructor/_Tasks/@NewTask/page"
import Tasks from "../_constructor/_Tasks/@Tasks/page"
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Main() {
  const {user, Ftasks} = useContext(AuthContext)
    
      return (
        <main className="h-full flex flex-col justify-between">
            <h1 className="ml-2">Tarefas de {user?.UserName}</h1>
            
            <NewTask />
  
            <Tasks Ftasks={Ftasks}/>
  
        </main>
      )
    
}
