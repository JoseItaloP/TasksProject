const {
    LoginUser,
    CreateUser,
    getUser,
    ChangeUser,
    findEmail,
    findPass
} = require('../controller/userControler')



const optgetUser = {
   
    handler: getUser,
}


const optLoginUser = {
 
    handler: LoginUser,
}

const optCreateUser = {
  
    handler: CreateUser,
}

const optChangeUser = {
 
    handler: ChangeUser,
}

const optFindEmail={
    handler: findEmail,
}

const optFindPass={
    handler: findPass,
}
const UserRoute = (fastify, opt, done) => {


     //GET USER
     fastify.get("/user/:id", optgetUser)

    //POST get login user
    fastify.post("/user/Login", optLoginUser)

    //POST create user
    fastify.post("/user", optCreateUser)

    //POST get Email
    fastify.post("/user/findEmail", optFindEmail)

    fastify.post("/user/findPas", optFindPass)

    //PUT change datas
    fastify.put("/user/:id", optChangeUser)

    done()
}

module.exports = UserRoute