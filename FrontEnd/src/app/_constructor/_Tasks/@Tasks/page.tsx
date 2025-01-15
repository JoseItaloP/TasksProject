
import { LiTaks } from "./@LiTask/page";
import { FilterTasksUser } from "../../TaskValue";



export default async function Tasks() {

  const filtred = await FilterTasksUser()

  return (

    <div className="bg-cold-600 border-hot-800 rounded-lg mx-4 h-4/5 ">

      <section className="bg-cyan-800 w-full rounded-t-lg border-b border-b-hot-800">
        <h1 className="px-4 py-2">Tasks</h1>

      </section>

      <ul className="px-4 ">
        
        {filtred.length > 0 ? (
          filtred.map((task) => <LiTaks key={task.ID} task={task} />)
        ) : (

          <h1>Sem tarefa valida para nesta conta.</h1>

        )}
      </ul>

    </div>
  );
}

