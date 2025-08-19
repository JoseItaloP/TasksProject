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
    shema: {
        tags: ['users'],
        description: 'push one user by ID',
        params: z.object({
            id: z.string(),
        }),
        headers: z.object({
            authorization: z.string()
        })
    },
    responce: {
        200: UserTypeSchema,
        400: z.object({
            message: z.string()
        }),
        500: z.object({
            message: z.string()
        })
    },
    handler: getUser,
}

const optLoginUser = {
    shema: {
        tags: ['users'],
        description: 'Login the user',
        body: z.object({
            UserName: z.string(),
            Password: z.string()
        })
    },
    responce: {
        200: UserTypeSchema,
        400: z.string().describe('senha invalida'),
        500: z.null().describe('fail to conclude the Login')
    },
    handler: LoginUser,
}

const optCreateUser = {
    shema: {
        tags: ['users'],
        describe: 'create a new user',
        body: {
            UserName: z.string(),
            Email: z.email()
        }
    },
    responce: {
        201: z.null().describe('User created'),
        400: z.null().describe('UserName or Email not found'),
        500: z.null().describe('Falha ao se conectar com Banco de dados')
    },
    handler: CreateUser,
}

const optChangeUser = {
    shema: {
        tags: ['users'],
        describe: 'change a user',
        param: z.object({
            id: z.string()
        }),
        body: z.object({
            UserName: z.string().optional,
            Password: z?.string(),
            Email: z?.email()
        })
    },
    responce: {
        200: z.boolean("true"),
        400: z.string().describe('Usuario não encontrado.'),
        500: z.null().describe('Falha ao se comunicar com Bando de dados')
    },
    handler: ChangeUser,
}

const optFindEmail = {
    shema: {
        tags: ['users'],
        describe: 'return the email of the user',
        body: z.object({
            UserName: z.string()
        })
    },
    responce: {
        200: z.email(),
        400: z.string(),
        500: z.string()
    },
    handler: findEmail,
}

const optFindPass = {
    shema: {
        tags: ['users'],
        describe: 'find the password by the email',
        body: z.object({
            Email: z.email()
        })
    },
    responce: {
        200: z.boolean("true"),
        400: z.string(),
        500: z.boolean("false")
    },
    handler: findPass,
}
const UserRoute = (fastify: FastifyTypedInstance) => {

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

}

export = UserRoute