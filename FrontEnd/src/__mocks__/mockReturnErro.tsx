import { ErroType } from "@/app/_constructor/_Types"


const mockErrFunc = (err: ErroType) => {
    const erros: ErroType[] = [err]
    return erros;
}
 const exportValues = {
    mockErrFunc
 }

 export default exportValues