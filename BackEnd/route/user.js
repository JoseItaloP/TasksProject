const {
    LoginUser,
    CreateUser,
    DropUser,
    ChangeUser
} = require('../controller/userControler')

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

    //GET Loggin user
    fastify.get("/user", optLoginUser)

    //POST create user
    fastify.post("/user", optCreateUser)

    //DELETE drop user
    fastify.delete("/user:iduser", optDropUser)

    //PUT change datas
    fastify.put("/user:id", optChangeUser)

    done()
}

module.exports = UserRoute