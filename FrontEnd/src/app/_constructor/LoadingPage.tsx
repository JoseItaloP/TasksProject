

export default function LoadingPage({absolt}: {absolt: boolean}) {

  if(absolt){
    return (
      <div className=" absolute
       h-full w-full z-50 bg-cyan-800/30 text-hot-900 left-0 top-0">
          <div className="loader">
              Carregando...
          </div>
      </div>
    )
  }else{
    return (
      <div className="
       h-full w-full z-50 bg-cyan-800/30 text-hot-900 left-0 top-0">
          <div className="loader">
              Carregando...
          </div>
      </div>
    )
  }
  
}
