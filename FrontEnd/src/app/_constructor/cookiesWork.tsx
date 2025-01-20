'use server'
import { cookies } from "next/headers";

async function saveOnCooks(idUser: number){  
    const cookStore = await cookies();
    cookStore.set("UserID", JSON.stringify(idUser));
}

async function getCooks(){
    const cookStore = await cookies();
    const UserID: {
        name: string,
        value: string
    } = cookStore.get("UserID") || {
        name: '',
        value:''
    };
   
    return UserID
}

async function dropCookes(){
    const cookStore = await cookies();
     cookStore.delete('UserID')
    return true
}

export {
    saveOnCooks,
    getCooks,
    dropCookes

}