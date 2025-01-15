
import { IoIosClose } from "react-icons/io";
import { ErroType } from "./_Types";



export default function ErrorHandler(){
    const errors: ErroType[] = []

    function ErrorBox(erros: ErroType[], error: ErroType){
        return(
            <div
              key={error.id}
              className="w-64 bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg"
            >
              <p className="flex-1">{error.message}</p>
              <IoIosClose
                className="cursor-pointer"
                onClick={() => erros.filter((erroE)=> erroE.id !== error.id)}
              />
            </div>
        )
    }

    function addError(message: string) {
        const errorId = Date.now(); 
        const newError = { id: errorId, message }
        errors.push(newError)
        setTimeout(() => {
          errors.filter((erro)=> erro.id != errorId)
        }, 5000);

        return newError
      }


    return {
        ErrorBox,
        addError
    }

}

