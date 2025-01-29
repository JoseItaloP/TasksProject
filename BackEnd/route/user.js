const {
    LoginUser,
    getUsers,
    CreateUser,
    getUser,
    DropUser,
    ChangeUser
} = require('../controller/userControler')

const optgetUsers = {
    handler: getUsers,
}

const optgetUser = {
    handler: getUser,
}


const optLoginUser = {
    handler: LoginUser,
}

const optCreateUser = {
    handler: CreateUser,
}

const optDropUser = {
    handler: DropUser,
}

const optChangeUser = {
    handler: ChangeUser,
}

const UserRoute = (fastify, opt, done) => {

    //GET allUSER
    fastify.get("/user", optgetUsers)

     //GET USER
     fastify.get("/user/:id", optgetUser)

    //POST get login user
    fastify.post("/user/Login", optLoginUser)

    //POST create user
    fastify.post("/user", optCreateUser)

    //DELETE drop user
    fastify.delete("/user/:id", optDropUser)

    //PUT change datas
    fastify.put("/user/:id", optChangeUser)

    done()
}

module.exports = UserRoute