const {
    getTasks,
    getUserTasks,
    postTasks,
    deleteTasks,
    putTasks
} = require('../controller/tasksControler')

// const defaultTasks = {
//     type: 'object',
//     properties:{
//         ID: {type: 'interger'},
//         Nome: {type: 'string'},
//         Descricao: {type: 'string'},
//         Status: {type: 'string'},
//         Priority: {type: 'string'},
//         created_at: {type: 'date'},
//         updated_at :{type: 'date'}
//     }
// }

const optGetAllTask = {
    // schema: {
    //     response:{
    //         200:{
    //             type: 'array',
    //             properties:defaultTasks
    //         }
    //     }
    // },
    handler: getTasks,
}

const optGetTask = {
    // schema: {
    //     response:{
    //         200:{
    //             type: 'array',
    //             properties:defaultTasks
    //         },
    //         404:{
    //             type: 'object',
    //             propeties:{
    //                 message: {type: 'string'}
    //             }
    //         },
    //         500:{
    //             type: 'string'
    //         }
    //     }
    // },
    handler: getUserTasks,
}

const optPostTask = {
    // schema:{
    //     body:{
    //         type: 'object',
    //         required: [Name,Descrição,Status, Priority, UserID],
    //         properties:{
    //             Name: {type: 'string'},
    //             Descrição: {type: 'string'},
    //             Status: {type: 'string'}, 
    //             Priority: {type: 'string'}, 
    //             UserID: {type: 'string'}
    //         }
    //     },
    //     response:{
    //         200:{
    //             type: 'boolean'
    //         },
    //         500:{
    //             type: 'string'
    //         }
    //     },
    // },
    handler: postTasks,
}

const optDeleteTask = {
    // shema: {
    //     respose:{
    //         200:{
    //             type: 'array',
    //             properties: defaultTasks
    //         },
    //         500:{
    //             types: 'string'
    //         }
    //     }
    // },
    handler: deleteTasks,
}

const optEditTask = {
    // schema: {
    //     body:{
    //         type: 'object',
    //         required: [Name, Descrição, Priority, Status],
    //         properties:{
    //             Name: {type: 'string'},
    //             Descrição: {type: 'string'},
    //             Status: {type: 'string'}, 
    //             Priority: {type: 'string'}, 
    //         }
    //     },
    //     response:{
    //         200:{
    //             type: 'array',
    //             propeties: defaultTasks
    //         },
    //         500:{
    //             type: 'string'
    //         }
    //     },
    // },
    handler: putTasks,
}

const TaskRoute = (fastify, opt, done) =>{

    // GET tasks
    fastify.get("/user/task", optGetAllTask)

    // GET user Tasks 
    fastify.get("/user/task/:id", optGetTask)
    

    // POST Create new taks
    fastify.post("/user/task", optPostTask)

    // DELETE taks
    fastify.delete("/user/task/:id", optDeleteTask)

    // PUT edit taks
    fastify.put("/user/task/:id", optEditTask)

    done();
}

module.exports = TaskRoute;