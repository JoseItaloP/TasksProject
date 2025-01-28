
import { LiTaks } from "./@LiTask/page";
import { taskType } from "../../_Types";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import LoadingPage from "../../LoadingPage";



export default function Tasks({Ftasks}: {Ftasks: taskType[]|null}) {
  const {loading} = useContext(AuthContext)
  if(loading){
    return <div className="bg-cold-600 border-hot-800 rounded-lg mx-4 h-4/5">
      <LoadingPage absolt={false} />
    </div> 
  } else{
    return (

      <div className="bg-cold-600 border-hot-800 rounded-lg mx-4 h-4/5 ">
  
        <section className="bg-cyan-800 w-full rounded-t-lg border-b border-b-hot-800">
          <h1 className="px-4 py-2">Tasks</h1>
  
        </section>
  
        <ul className="px-4 ">
          
          {Ftasks ? (
            Ftasks.map((task) => <LiTaks key={task.ID} task={task} />)
          ) : (
            <h1>Sem tarefa valida para nesta conta.</h1>
          )}
        </ul>
  
      </div>
    );
  }
  
}

