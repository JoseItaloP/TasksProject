import { FastifyReply, FastifyRequest } from "fastify"

type ReqTypes = {
  Params: {
    id?: string
  },
  Headers: {
    authorization?: string
  },
  Body:{
     UserName?: string, 
     Password?: string,
     Email?: string
  }
}

type ReqTypeTask = {
    Params: {
        id?: string
      },
      Body:{
        Nome?: string,
        Descricao?: string, 
        Status?: string, 
        Priority?: string, 
        UserID?: string
      }
}

export {
    ReqTypes,
    ReqTypeTask
}