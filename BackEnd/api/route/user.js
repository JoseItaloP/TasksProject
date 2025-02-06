const {
    LoginUser,
    CreateUser,
    getUser,
    ChangeUser,
    findEmail,
    findPass
} = require('../controller/userControler')

// const userResponse = {
//     type: 'object',
//     properties: {
//         ID: {type: 'integer'},
//         UserName: {type: 'string'},
//         Password: {type: 'string'},
//         Token: {type: 'string'},
//         created_at: {type: 'date'},
//         Email: {type: 'string'},
//         Salt_Key: {type: 'string'},
//         updated_at: {type: 'date'}
//     }
// }

const optgetUser = {
    // shema: {
    //     headers:{
    //         type: 'string',
    //         required: [authorization]
    //     },
    //     response:{
    //         200:userResponse,
    //         500:{
    //             type: 'object',
    //             properties: {
    //                 message: {
    //                     type: 'string'
    //                 }
    //             }
    //         }
    //     }
    // },
    handler: getUser,
}


const optLoginUser = {
    // schema:{
    //     body: {
    //         type: 'object',
    //         require: [UserName, Password],
    //         properties: {
    //             UserName: {type: 'string'},
    //             Password: {type: 'string'}
    //         }
    //     },
    //     response:{
    //         200: userResponse,
    //         500: {
    //             type: 'null',
    //         }
    //     }
    // },
    handler: LoginUser,
}

const optCreateUser = {
    // schema: {
    //     body: {
    //         type: 'object',
    //         require: [UserName, Email],
    //         properties: {
    //             UserName: {type: 'string'},
    //             Email: {type: 'string'}
    //         }
    //     },
    // },
    handler: CreateUser,
}

const optChangeUser = {
    // schema: {
    //     body: {
    //         type: 'object',
    //         require: [Username,Password, Email],
    //         properties: {
    //             UserName: {type: 'string'},
    //             Password: {type: 'string'},
    //             Email: {type: 'string'}
    //         }
    //     },
    //     response:{
    //         200:{
    //             type: 'array',
    //             properties: userResponse,
    //         },
    //         500: {
    //             type: 'string',
    //         }
    //     }
    // },
    handler: ChangeUser,
}

const optFindEmail={
    // schema: {
    //     body: {
    //         type: 'string',
    //         require: [Username]
    //     },
    //     response:{
    //         200:{
    //             type: 'object',
    //             properties: {
    //                 Email: {type: 'string'}
    //             },
    //         },
    //         500: {
    //             type: 'null',
    //         }
    //     }
    // },
    handler: findEmail,
}

const optFindPass={
    // schema: {
    //     body: {
    //         type: 'string',
    //         require: [Email]
    //     },
    //     response:{
    //         200:{
    //             type: 'boolean'
    //         },
    //         500: {
    //             type: 'boolean'
    //         }
    //     }
    // },
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