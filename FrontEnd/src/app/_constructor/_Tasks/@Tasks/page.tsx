
import { LiTaks } from "./@LiTask/page";
import { useContext} from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import LoadingPage from "../../LoadingPage";



export default function Tasks() {
  const { loadingTasks, Ftasks } = useContext(AuthContext);

  if (loadingTasks) {
    return (
      <div className="bg-cold-600 border-hot-800 rounded-lg mx-4 h-4/5">
        <LoadingPage absolt={false} />
      </div>
    );
  } else {
    return (
      <div className="bg-cold-600 border-hot-800 rounded-lg mx-4 h-4/5 flex flex-col">
        <section className="bg-cyan-800 w-full rounded-t-lg border-b border-b-hot-800">
          <h1 className="px-4 py-2">Tasks</h1>
        </section>

        <ul className="px-4 flex-1 overflow-y-auto">
          {Ftasks && Ftasks.length > 0 ? (
            Ftasks.map((task) => <LiTaks key={task.id} task={task} />)
          ) : (
            <h1>Sem tarefa válida nesta conta.</h1>
          )}
        </ul>
      </div>
    );
  }
}


