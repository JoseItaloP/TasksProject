const {
    getTasks,
    getUserTasks,
    postTasks,
    deleteTasks,
    putTasks
} = require('../controller/tasksControler')


const optGetAllTask = {
    handler: getTasks,
}

const optGetTask = {
    handler: getUserTasks,
}

const optPostTask = {
    handler: postTasks,
}

const optDeleteTask = {
    handler: deleteTasks,
}

const optEditTask = {
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