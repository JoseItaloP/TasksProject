import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import  app  from "../../../index"; 
import request from "supertest";
import { PrismaClient } from "../../../../generated/prisma/client"
import { FastifyRequest } from "fastify";
import { ReqTypes } from "../../../types/RouteTypeHamdle";
import { UserType } from "../../../types/UserTypeToFront";
import { getPass } from "../../../controller/helper/UserSuporte";
import { generateNonExistentObjectId } from "./help/generateID";



describe('E2E test for the route User',()=>{
    const prisma = new PrismaClient()
    let testUser: UserType

    beforeAll(async ()=>{ 
       app.post('/userTestCreate',async(req: FastifyRequest<ReqTypes>, reply)=>{
            const {
                UserName, Email
            } = req.body

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
            reply.code(201).send(returnUser)
        })
        
        app.delete('/deleteAllUsers', async (req, reply)=>{
            await prisma.user.deleteMany()
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

        const responceNewUser = await request(app.server)
        .post('/userTestCreate')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: 'Testing',
            Email: "Email@Testing.com"
        })
        testUser = responceNewUser.body
        
        expect(responceNewUser.status).toBe(201)
    }) 

    afterAll(async ()=>{
        await app.close()
        await prisma.$disconnect()
    })

    //POST /user/Login
    it("Should make the login correctly", async()=>{
        const loginUser = await request(app.server)
        .post('/user/Login')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: 'Testing',
            Password: 'passwordTest'
        })
        .expect(200)

        expect(loginUser.body.UserName).toBe(testUser.UserName)
        expect(loginUser.body.Email).toBe(testUser.Email)
        expect(loginUser.body.Password).toBe(testUser.Password)

    })
    it("Should return 400 from User in Login", async ()=>{
        const loginUser = await request(app.server)
        .post('/user/Login')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: 'notTheTestingUser',
            Password: 'passwordTest'
        })
        .expect(400)
        expect(loginUser.text).toBe("Usuário não identificados no banco de dados")
    })
    it("Should return 400 from Password in Login",async ()=>{
        const loginUser = await request(app.server)
        .post('/user/Login')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: 'Testing',
            Password: 'notThePass'
        })
        .expect(400)
        expect(loginUser.text).toBe("Senha não coincide com Usuario")
    })

    //POST /user
    it("Should create a new User correctly", async ()=>{
        await request(app.server)
        .post('/user')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: 'Testing2',
            Email: 'Email2@testing.com'
        })
        .expect(201)
    })
    it("Should return 400 in CreateUser", async ()=>{
        await request(app.server)
        .post('/user')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: '',
            Email: ''
        })
        .expect(400)
    })
    

    //GET /user/:id
    it("Should get the user", async ()=>{
        
        const findUser = await request(app.server)
        .get(`/user/${testUser.id}`)
        .set('Authorization', `${testUser.Token}`)
        .expect(200)
        
        const bodyFindUser: UserType = findUser.body
        
        expect(bodyFindUser.Email).toBe("Email@Testing.com")
    })
    it("Should return erro 400 from Token in GetUser", async ()=>{
        const findUser = await request(app.server)
        .get(`/user/${testUser.id}`)
        .set('Authorization', ``)
        .expect(400)

        expect(findUser.body.message).toBe('Token invalido!')
    })


    //PUT /user/:id
    it("Should edit the user", async ()=>{
        const editedUser = await request(app.server)
        .put(`/user/${testUser.id}`)
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            Email: 'EmailEdited@Testing.com'
        })
        .expect(200)

        expect(editedUser.body).toBeTruthy()
    })
    it("Should return code 400 in changeUser", async ()=>{
        const fakeId = generateNonExistentObjectId()
        const editedUser = await request(app.server)
        .put(`/user/${fakeId}`)
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            Email: 'EmailEdited@Testing.com'
        })
        expect(editedUser.status).toBe(400)
        expect(editedUser.text).toBe('Usuario nao encontrado')

    })


    //POST /user/findEmail
    it("Should get the Email of the user", async ()=>{
        const getEmail = await request(app.server)
        .post('/user/findEmail')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: testUser.UserName
        })
        .expect(200)

        expect(getEmail.body).toBe(testUser.Email)
    })
    it("Should return 400 error from User not found in findEmail", async()=>{
        const getEmail = await request(app.server)
        .post('/user/findEmail')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            UserName: 'NotTheUser'
        })
        .expect(400)
        expect(getEmail.text).toBe('Usuario nao encontrado')
    })


    //Post /user/findPas
    it("Should reset the password of the user", async()=>{
        const resetPass = await request(app.server)
        .post('/user/findPas')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            Email: testUser.Email
        })
        .expect(200)

        expect(resetPass.body).toBeTruthy()
    })
    it("Should return 400 with false in findPass from Email", async ()=>{
        const resetPass = await request(app.server)
        .post('/user/findPas')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            Email: ''
        })
        .expect(400)

        expect(resetPass.text).toBe('Email não foi preenchido')
    })
    it("Should return 400 with false in findPass from User not found", async()=>{
        const resetPass = await request(app.server)
        .post('/user/findPas')
        .set('Authorization', 'Bearer TOKEN_FAKE')
        .send({
            Email: 'NotTheEmail'
        })
        .expect(400)

        expect(resetPass.text).toBe('Usuario não encontrado')
    })
})