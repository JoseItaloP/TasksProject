import { FastifyTypedInstance } from "../types/FastifyInstance"


import {
    LoginUser,
    CreateUser,
    getUser,
    ChangeUser,
    findEmail,
    findPass
} from '../controller/userControler'
import z from "zod/v4"

const UserTypeSchema = z.object({
    id: z.number(),
    UserName: z.string(),
    Password: z.string(),
    Email: z.email(),
    Token: z.string(),
    myTasks: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date().nullable().optional(),
    SaltKey: z.string()
});


const optgetUser = {
    schema: {
        tags: ['users'],
        description: 'push one user by ID',
        params: z.object({
            id: z.string(),
        }),
        headers: z.object({
            authorization: z.string()
        })
    },
    response: {
        200: UserTypeSchema,
        400: z.object({
            message: z.string()
        }),
        500: z.object({
            message: z.string()
        })
    }
}

const optLoginUser = {
    schema: {
        tags: ['users'],
        description: 'Login the user',
        body: z.object({
            UserName: z.string(),
            Password: z.string()
        })
    },
    response: {
        200: UserTypeSchema,
        400: z.string().describe('senha invalida'),
        500: z.null().describe('fail to conclude the Login')
    }
}

const optCreateUser = {
    schema: {
        tags: ['users'],
        describe: 'create a new user',
        body: z.object({
            UserName: z.string(),
            Email: z.email()
        })
    },
    response: {
        201: z.null().describe('User created'),
        400: z.null().describe('UserName or Email not found'),
        500: z.null().describe('Falha ao se conectar com Banco de dados')
    }
}

const optChangeUser = {
    schema: {
        tags: ['users'],
        describe: 'change a user',
        params: z.object({
            id: z.string()
        }),
        body: z.object({
            UserName: z.string().optional(),
            Password: z.string().optional(),
            Email: z.email().optional()
        })
    },
    response: {
        200: z.boolean("true"),
        400: z.string().describe('Usuario não encontrado.'),
        500: z.null().describe('Falha ao se comunicar com Bando de dados')
    }
}

const optFindEmail = {
    schema: {
        tags: ['users'],
        describe: 'return the email of the user',
        body: z.object({
            UserName: z.string()
        })
    },
    response: {
        200: z.email(),
        400: z.string(),
        500: z.string()
    }
}

const optFindPass = {
    schema: {
        tags: ['users'],
        describe: 'find the password by the email',
        body: z.object({
            Email: z.email()
        })
    },
    response: {
        200: z.boolean(),
        400: z.string(),
        500: z.boolean()
    }
}
export async function UserRoute(fastify: FastifyTypedInstance) {

    //GET USER
    fastify.get("/user/:id", optgetUser, getUser)

    //POST get login user
    fastify.post("/user/Login", optLoginUser, LoginUser)

    // //POST create user
    fastify.post("/user", optCreateUser, CreateUser)

    // //POST get Email
    fastify.post("/user/findEmail", optFindEmail, findEmail)

    fastify.post("/user/findPas", optFindPass, findPass)

    // //PUT change datas
    fastify.put("/user/:id", optChangeUser, ChangeUser)

}

export default UserRoute