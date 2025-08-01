
import { IoIosClose } from "react-icons/io";
import { ErroType } from "./_Types";



export default function ErrorHandler(){
    const errors: ErroType[] = []

    function ErrorBox(erros: ErroType[], error: ErroType){
        return(
            <div
            key={error.erroId}
              className="w-64 bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg"
            >
              <p className="flex-1">{error.message}</p>
              <IoIosClose
                className="cursor-pointer"
              onClick={() => erros.filter((erroE) => erroE.erroId !== error.erroId)}
              />
            </div>
        )
    }

    function addError(message: string) {
      const erroId = Date.now();
      const newError = { erroId, message }
        errors.push(newError)
        setTimeout(() => {
          errors.filter((erro) => erro.erroId != erroId)
        }, 5000);

        return newError
      }


    return {
        ErrorBox,
        addError
    }

}

