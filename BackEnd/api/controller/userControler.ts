import { v4 } from "uuid"
import {compare} from 'bcryptjs'
import {
  getPass,
  GeneratePassword
} from './helper/UserSuporte'
import { senPassEmail } from "./helper/SendPassEmail"

import { PrismaClient } from "../../generated/prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"
import { UserTypeDB } from "../types/UserTypeFromDataBase"
import { ReqTypes } from "../types/RouteTypeHamdle"
import { UserType } from "../types/UserTypeToFront"

const prisma = new PrismaClient()


async function getUser(req: FastifyRequest<ReqTypes>, reply: FastifyReply) {
  const { authorization: token } = req.headers
  const { id } = req.params

  try {
    const dbUser: UserType | null = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if(dbUser == null){
      const erro = { message: 'Usuario não encontrado' }
      return reply.code(500).send(erro)
    }
    const ValidateToken = dbUser.Token == token ? true : false
    if (!ValidateToken) {
      const erro = { message: 'Token invalido!' }
      return reply.code(400).send(erro)
    }
    return reply.code(200).send(dbUser)

  } catch (e) {
    console.error('Erro: ', e)
    const erro = { message: 'Usuario não encontrado' }
    reply.code(500).send(erro)
  }

};

const LoginUser = async (req: FastifyRequest<ReqTypes>, reply: FastifyReply) => {
  try {

    const { UserName, Password } = req.body
    const logedUserName = await prisma.user.findUnique({
      where: {
        UserName: UserName
      }
    })

    if (!logedUserName) { return reply.code(400).send("Usuário ou senha não identificados no banco de dados") }

    const { Password: dataSenha, SaltKey } = logedUserName

    const passToCompare = JSON.stringify(Password) + JSON.stringify(SaltKey)

    const comparePass = await compare(passToCompare, dataSenha)

    if (!comparePass) { return reply.code(400).send("Usuário ou senha não identificados no banco de dados") }

    return reply.code(200).send(logedUserName)

  } catch (err) {
    reply.code(500);
  }
};

const CreateUser = async (req: FastifyRequest<ReqTypes>, reply: FastifyReply) => {
  try {

    const { UserName, Email } = req.body;

    if(UserName == undefined || Email == undefined) return reply.status(400)

    const Password = GeneratePassword(8)
    const {
      hashedPassword,
      SaltKey
    } = await getPass(Password)

    const Token = v4();

    await prisma.user.create({
      data: {
        UserName,
        Password: hashedPassword,
        Token,
        Email,
        SaltKey,
        myTasks: []
      }
    })

    await senPassEmail(Email, Password)

    reply.status(201)


  } catch (err) {
    console.error('Erro: ', err)
    reply.code(500);
  }

};

const ChangeUser = async (req: FastifyRequest<ReqTypes>, reply: FastifyReply) => {

  try {
    const { id } = req.params;
    const { UserName, Password, Email } = req.body;
    
    const existingUser: UserTypeDB | null = await prisma.user.findUnique({
      where: { id: id }
    });
    
    if (!existingUser) {
      return reply.code(400);
    }

    let updateData = {
      updatedAt: new Date(),
      UserName: existingUser.UserName,
      Email:existingUser.Email,
      Password: existingUser.Password,
      SaltKey: existingUser.SaltKey
    }

    if (UserName !== undefined) { updateData.UserName = UserName }
    if (Email !== undefined) { updateData.Email = Email }
    if (Password) {
      const { hashedPassword, SaltKey } = await getPass(Password)

      updateData.Password = hashedPassword;
      updateData.SaltKey = SaltKey;
    }

    await prisma.user.update({
      where: {
        id
      },
      data: updateData
    })

    reply.code(200).send(true)

  } catch (err) {
    console.error('Erros: ', err)
    reply.code(500)
  }
};

const findEmail = async (req: FastifyRequest<ReqTypes>, reply: FastifyReply) => {
  const { UserName } = req.body
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        UserName
      }
    })
    if (!findUser) {
      return reply.code(500).send('Usuario nao encontrado')
    }
    reply.code(200).send(findUser.Email)
  } catch (e) {
    reply.code(500).send('Falha em se comunicar com o banco de dados')
  }
}

const findPass = async (req: FastifyRequest<ReqTypes>, reply: FastifyReply) => {
  const { Email } = req.body
  
  try {

    const userFind = await prisma.user.findUnique({
      where: {
        Email
      }
    })
    if (!userFind) { return reply.code(400).send(false) }

    const Password = GeneratePassword(8)
    const { hashedPassword, SaltKey } = await getPass(Password)

    const updatedAt = new Date();

    await prisma.user.update({
      where: {
        id: userFind.id
      },
      data: {
        SaltKey,
        Password: hashedPassword,
        updatedAt
      }
    })

    await senPassEmail(Email, Password)

    reply.code(200).send(true)

  } catch (e) {
    reply.code(500).send(false)
  }
}

export {
  LoginUser,
  CreateUser,
  getUser,
  ChangeUser,
  findEmail,
  findPass
};
