import { FastifyTypedInstance } from "../types/FastifyInstance";
import { z } from 'zod/v4'
import {
    getUserTasks,
    postTasks,
    deleteTasks,
    putTasks
} from '../controller/tasksControler'



const TaskSchema = z.object({
    id: z.string(),
    Nome: z.string(),
    Descricao: z.string(),
    Status: z.string(),
    Priority: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().nullable().optional()
});


const optGetTask = {
    schema: {
        tags: ['Tasks'],
        description: 'Retorna as tasks de um usuário específico.',
        params: z.object({
            id: z.string(),
        }),
        response: {
            200: z.array(TaskSchema),
            400: z.object({
                message: z.string(),
            }),
            500: z.object({
                message: z.string(),
            }),
        },
    },
};

const optPostTask = {
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
            500: z.object({
                statusCode: z.number(),
                code: z.string(),
                message: z.string()
            }
            ),
        },
    },
};


const optDeleteTask = {
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

    // GET user Tasks
    fastify.get('/user/task/:id', optGetTask, getUserTasks);

    // POST Create new task
    fastify.post('/user/task', optPostTask, postTasks);

    // DELETE task
    fastify.delete('/user/task/:id', optDeleteTask, deleteTasks);

    // PUT edit task
    fastify.put('/user/task/:id', optEditTask, putTasks);
};



export default TaskRoute;
