import { FastifyTypedInstance } from "../types/FastifyInstance";
import { z } from 'zod/v4'
import {
    
    getUserTasks,
    postTasks,
    deleteTasks,
    putTasks
}  from '../controller/tasksControler'



const TaskSchema = z.object({
    id: z.string(),
    Nome: z.string(),
    Descricao: z.string(),
    Status: z.string(),
    Priority: z.string(),
    updatedAt: z.string(), 
});

// const optGetAllTask = {
//     handler: getTasks,
//     schema: {
//         tags: ['Tasks'],
//         description: 'Retorna todas as tasks.',
        
//         response: {
//             200: z.array(TaskSchema),
//             500: z.object({
//                 message: z.string(),
//             }),
//         },
//     },
// };

const optGetTask = {
    handler: getUserTasks,
    schema: {
        tags: ['Tasks'],
        description: 'Retorna as tasks de um usuário específico.',
        params: z.object({
            id: z.string(),
        }),
        response: {
            200: z.array(TaskSchema),
            404: z.object({
                message: z.string(),
            }),
            500: z.object({
                message: z.string(),
            }),
        },
    },
};

const optPostTask = {
    handler: postTasks,
    schema: {
        tags: ['Tasks'],
        description: 'Cria uma nova task e a associa a um usuário.',
        body: z.object({
            Nome: z.string(),
            Descricao: z.string(),
            Status: z.string(),
            Priority: z.string(),
            UserID: z.string(),
        }),
        response: {
            201: TaskSchema,
            400: z.string(),
            500: z.string(),
        },
    },
};

const optDeleteTask = {
    handler: deleteTasks,
    schema: {
        tags: ['Tasks'],
        description: 'Deleta uma task pelo ID.',
        params: z.object({
            id: z.string(),
        }),
        body: z.object({
            UserID: z.string()
        }),
        response: {
            200: z.null(),
            400: z.string(),
            500: z.string(),
        },
    },
};

const optEditTask = {
    handler: putTasks,
    schema: {
        tags: ['Tasks'],
        description: 'Edita uma task existente.',
        params: z.object({
            id: z.string(),
        }),
        body: z.object({
            Nome: z.string(),
            Descricao: z.string(),
            Status: z.string(),
            Priority: z.string(),
        }),
        response: {
            200: z.null(),
            400: z.string(),
            500: z.object({
                message: z.string(),
            }),
        },
    },
};

const TaskRoute = (fastify: FastifyTypedInstance) => {
    // GET tasks
    // fastify.get('/user/task', optGetAllTask);

    // GET user Tasks
    fastify.get('/user/task/:id', optGetTask);

    // POST Create new task
    fastify.post('/user/task', optPostTask);

    // DELETE task
    fastify.delete('/user/task/:id', optDeleteTask);

    // PUT edit task
    fastify.put('/user/task/:id', optEditTask);
};

module.exports = TaskRoute;
