import { ChangeEventHandler, useState } from "react"
import { FaEye } from "react-icons/fa";


export default function PassInput(ClassN: string, Change: ChangeEventHandler<HTMLInputElement>, PassValue: string){
    const [type, setType] = useState()
    return(
        <input type={type} name="" id="" className={`${ClassN}`} value={PassValue} onChange={Change}/>
    )
}