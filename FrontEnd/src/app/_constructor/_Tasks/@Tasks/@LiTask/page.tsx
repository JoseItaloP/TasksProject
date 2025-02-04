import { taskType } from "@/app/_constructor/_Types";
import Link from "next/link";

export function LiTaks({ task }: { task: taskType }) {
  const getPriorityC = () => {
    switch (task.Priority) {
      case "baixa":
        return "text-baixa";
      case "media":
        return "text-media";
      case "alta":
        return "text-alta";
      default:
        return "";
    }
  };

  const getStatusC = () => {
    switch (task.Status) {
      case "atuando":
        return "text-atuando";
      case "completa":
        return "text-completa";
      case "abandonada":
        return "text-abandonada";
      default:
        return "";
    }
  };

  return (
    <li>
      <Link
        href={`/User/Task/${task.ID}`}
        className="bg-cold-900 border border-hot-800
         rounded flex items-center justify-between
         my-2 h-16 p-2 buttonHAnimation"
      >
        <h1 className="text-2xl font-bold mr-4 left-0 w-1/6 overflow-hidden whitespace-nowrap">{task.Nome}</h1>
        <p className=" overflow-hidden text-ellipsis whitespace-nowrap w-4/6">
          {task.Descricao}
        </p>
        <section className="ml-4 w-1/6 
        flex items-center 
        max-[900px]:flex-col max-[900px]:mr-2  ">
          <h2 className={`text-sm font-bold ${getPriorityC()}`}>
            {task.Priority}
          </h2>
          <strong className="mx-1 
          max-[900px]:rotate-90 max-[900px]:-my-1">|</strong>
          <h2 className={`text-sm font-bold ${getStatusC()}`}>{task.Status}</h2>
        </section>
      </Link>
    </li>
  );
}
