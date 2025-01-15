import Link from "next/link";

export default function NewTask(){
    return(
        <Link href={'/User/Task/nova_task'} className=" p-10 m-4 text-center bg-cold-900 border border-hot-800 rounded-lg buttonHAnimation">
            Nova tarefa
        </Link>
    )
}