import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "./help/serverTest";
import { PrismaClient } from "../../../../generated/prisma/client"
import { taskType } from "../../../types/TaskType";
import { FastifyReply, FastifyRequest } from "fastify";
import { ReqTypes, ReqTypeTask } from "../../../types/RouteTypeHamdle";
import { UserType } from "../../../types/UserTypeToFront";
import { getPass } from "../../../controller/helper/UserSuporte";
import request from "supertest";
import { generateNonExistentObjectId } from "./help/generateID";

type ReqAll = ReqTypes & ReqTypeTask 

describe("E2E test for the route Task", ()=>{
     const prisma = new PrismaClient()
     let testUser: UserType
     let testTask: taskType

    beforeAll(async ()=>{
        // criar rotas para uso de test

        app.post('/createTaskUserTest', async (req: FastifyRequest<ReqAll>, reply: FastifyReply) => {
            const { Nome, Descricao, Status, Priority, UserName, Email } = req.body;

            if(!UserName || !Email) return reply.code(400)

            const returnGetPass = await getPass('passwordTest')
            if (!returnGetPass) return reply.code(500)
            const hashedPassword = returnGetPass.hashedPassword
            const SaltKey = returnGetPass.SaltKey

           const returnUser = await prisma.user.create({
                data: {
                    UserName,
                    Email,
                    Password: hashedPassword,
                    Token: 'testToken',
                    SaltKey: SaltKey
                }
            })

            if(!Nome || !Descricao || !Status || !Priority || !returnUser) return reply.send(400).send('Todos os dados devem ser preenchidos')
            const newTask: taskType = await prisma.tasks.create({
                data: {
                    Nome,
                    Descricao,
                    Status,
                    Priority
                  }
                })

            const idTask = [newTask.id]

            await prisma.user.update({
                    where: {
                        id: returnUser.id
                    },
                    data: {
                        myTasks: idTask
                    }
                })

            reply.code(201).send({returnUser, newTask})

        })

        app.delete('/deleteAllUsers', async (req: FastifyRequest, reply: FastifyReply) => {
            await prisma.user.deleteMany()
            reply.code(200)
        })

        app.delete('/deleteAllTask', async (req: FastifyRequest, reply: FastifyReply) => {
            await prisma.tasks.deleteMany()
            reply.code(200)
        })

        const start = async () => {
        try {

        await app.listen({ port: 3000 });
        } catch (err) {
        console.error(err);
        process.exit(1);
        }
    };

        start()

        await app.ready()
    })

    beforeEach(async ()=>{
        await request(app.server).delete('/deleteAllUsers').set('Authorization', 'Bearer TOKEN_FAKE')

        const reponceCreateUserTask = await request(app.server)
            .post('/createTaskUserTest')
            .set('Authorization', 'Bearer TOKEN_FAKE')
            .send({
                Nome: 'testTask', 
                Descricao: 'description test task', 
                Status: 'StatusTest', 
                Priority: 'PriorityTest', 
                UserName: 'Testing',
                Email: "Email@Testing.com"
            })

        testUser = reponceCreateUserTask.body.returnUser
        testTask = reponceCreateUserTask.body.newTask
        
        expect(reponceCreateUserTask.status).toBe(201)

    })

    afterAll(async ()=>{
        afterAll(async ()=>{
        await app.close()
        await prisma.$disconnect()
    })
    })

    // GET /user/task/:id
    it('Should get the task', async ()=>{
        const reponceGetTask = await request(app.server)
        .get(`/user/task/${testUser.id}`)
        .set("Authorization", "Bearer TOKEN_FAKE")

        const taskResponce: taskType[] = reponceGetTask.body
        expect(taskResponce[0].Nome).toBe("testTask")
    })
    it("Should return 500 - Erro ao se comunicar com o servidor - in GET", async ()=>{
        const reponceGetTask = await request(app.server)
        .get(`/user/task/0}`)
        .set("Authorization", "Bearer TOKEN_FAKE")
        
        expect(reponceGetTask.status).toBe(500)
        expect(reponceGetTask.body.message).toBe("Erro ao se comunicar com o servidor")
    })
    it("Should return 400 - Usuario nao encontrado - in GET", async ()=>{
        const FakeId = generateNonExistentObjectId()
        const reponceGetTask = await request(app.server)
        .get(`/user/task/${FakeId}`)
        .set("Authorization", "Bearer TOKEN_FAKE")
        
        expect(reponceGetTask.status).toBe(400)
        
        expect(reponceGetTask.body.message).toBe("Usuário não encontrado")
    })

    // POST /user/task
    it('Should post a new task', async ()=>{
        const newTask = {
            Nome: 'task2Test', 
            Descricao: "Descrição task 2 test", 
            Status: "Status task 2 test", 
            Priority: "Priority task 2 test", 
            UserID: testUser.id
        }
        const newTaskResponce = await request(app.server)
        .post(`/user/task`)
        .set("Authorization", "Bearer TOKEN_FAKE")
        .send(newTask)
        .expect(201)

        expect(newTaskResponce.body.Nome).toBe(newTask.Nome)
        expect(newTaskResponce.body.Descricao).toBe(newTask.Descricao)
        expect(newTaskResponce.body.Status).toBe(newTask.Status)
        expect(newTaskResponce.body.Priority).toBe(newTask.Priority)
        
    })
    it("Should return 400 - Usuario nao encontrado - in POST", async ()=>{
        const fakeId = generateNonExistentObjectId()
        const newTask = {
            Nome: 'task2Test', 
            Descricao: "Descrição task 2 test", 
            Status: "Status task 2 test", 
            Priority: "Priority task 2 test", 
            UserID: fakeId
        }
        const newTaskReponce = await request(app.server)
        .post('/user/task')
        .set('Authorization', "Bearer TOKEN_FAKE")
        .send(newTask)

        console.error('reponce ------- ', newTaskReponce)

        expect(newTaskReponce.status).toBe(400)
        expect(newTaskReponce.text).toBe("Usuario não encontrado.")
        
    })
    it("Should return 400 - Todos os dados devem ser preenchidos - in 400", async ()=>{
        const newTask = {
            Nome: '', 
            Descricao: "", 
            Status: "", 
            Priority: "",
            UserID: testUser.id
        }
        const newTaskReponce = await request(app.server)
        .post('/user/task')
        .set('Authorization', "Bearer TOKEN_FAKE")
        .send(newTask)

        expect(newTaskReponce.status).toBe(400)
        expect(newTaskReponce.text).toBe('Todos os dados devem ser preenchidos')
    })
    it('Should return erro in schema', async ()=>{
        const newTask = {
            Nome: '', 
            Descricao: "", 
         
        }
        const newTaskReponce = await request(app.server)
        .post('/user/task')
        .set('Authorization', "Bearer TOKEN_FAKE")
        .send(newTask)
        
        expect(newTaskReponce.status).toBe(500)
        expect(newTaskReponce.body.message).toBe("Failed to serialize an error. Error: Response doesn't match the schema. Original error: body/Status Invalid input: expected string, received undefined, body/Priority Invalid input: expected string, received undefined, body/UserID Invalid input: expected string, received undefined")
    })
    
    // DELETE /user/task/:id
    it('Should delete the task', async ()=>{
        
        await request(app.server)
        .delete(`/user/task/${testTask.id}`)
        .set("Authorization", "Bearer TOKEN_FAKE")
        .send({
            UserID: testUser.id
        })
        .expect(200)
    })
    it("Should return 400 - Usuario nao encontrado - in DELETE", async ()=>{
        const fakeId = generateNonExistentObjectId()
        const responceDelete = await request(app.server)
        .delete('/user/task/00')
        .set("Authorization", "Bearer TOKEN_FAKE")
        .send(
            {UserID: fakeId}
        )
        expect(responceDelete.status).toBe(400)
        expect(responceDelete.text).toBe('Usuario não encontrado')
    })
    it("Should return 400 - Task nao encontrada - in DELETE", async ()=>{
        const fakeId = generateNonExistentObjectId()
        const reponceDelete = await request(app.server)
        .delete(`/user/task/${fakeId}`)
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserID: testUser.id
        })

        expect(reponceDelete.status).toBe(400)
        expect(reponceDelete.text).toBe('Task não encontrada')
    })
    it("Should return 500 -- schema error -- in DELETE", async ()=>{
        const reponceDelete = await request(app.server)
        .delete(`/user/task/00`)
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send()

        expect(reponceDelete.status).toBe(500)
        expect(reponceDelete.body.message).toBe("Failed to serialize an error. Error: Response doesn't match the schema. Original error: body/ Invalid input: expected object, received null")
    })

    // PUT /user/task/:id
    it('Should edit a task', async ()=>{
        const newEditedTask = {
            ...testTask,
            Nome: 'newNome task 2'
        }
        await request(app.server)
        .put(`/user/task/${testTask.id}`)
        .set("Authorization", "Bearer TOKEN_FAKE")
        .send(newEditedTask)
        .expect(200)

        const reponceGetTask = await request(app.server)
        .get(`/user/task/${testUser.id}`)
        .set("Authorization", "Bearer TOKEN_FAKE")

        expect(reponceGetTask.body[0].Nome).toBe(newEditedTask.Nome)
    })
    it("Should return 400 - task nao encontrada - in PUT", async ()=>{
        const newEditedTask = {
            ...testTask,
            Nome: 'newNome task 2'
        }
        const fakeId = generateNonExistentObjectId()
        const reponcePut = await request(app.server)
        .put(`/user/task/${fakeId}`)
        .set("Authorization", "Bearer TOKEN_FAKE")
        .send(newEditedTask)
        
        expect(reponcePut.status).toBe(400)
        expect(reponcePut.text).toBe("Task nao encontrada.")
    })
    it("Should return 400 - Dados preenchidos nao chegaram ao banco de dados, tente novamente - in PUT", async ()=>{
        const newEditedTask = {
            ...testTask,
            Nome: ''
        }
        
        const reponcePut = await request(app.server)
        .put(`/user/task/${testTask.id}`)
        .set("Authorization", "Bearer TOKEN_FAKE")
        .send(newEditedTask)
        
        expect(reponcePut.status).toBe(400)
        expect(reponcePut.text)
        .toBe("Dados preenchidos não chegaram ao banco de dados, tente novamente.")
    })
    
    it("Should return 500 -- schema error -- in PUT", async ()=>{
         const reponceDelete = await request(app.server)
        .put(`/user/task/00`)
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send()

        expect(reponceDelete.status).toBe(500)
        expect(reponceDelete.body.message)
        .toBe("Failed to serialize an error. Error: Response doesn't match the schema. Original error: body/ Invalid input: expected object, received null")
    })

})