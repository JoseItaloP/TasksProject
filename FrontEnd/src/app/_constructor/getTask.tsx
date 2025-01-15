'use server'
import { taskType } from "./_Types";
import { getTask } from "./TaskValue";

export default async function getUTask(TId: number){
    try{
        const task: taskType|null = await getTask(TId);
        if (task ) {
            return task
        }else {
            return null
        }
    }catch(e){
        console.error('Error: ',e)
        return null
    }
    
}