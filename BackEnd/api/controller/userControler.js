const { v4 } = require("uuid")
const getFormatData = require('../functions/FormData').exports
const { compare } = require('bcryptjs')
const {
  getPass,
  GeneratePassword
} = require('./helper/UserSuporte')
const { senPassEmail } = require("./helper/SendPassEmail")

const { PrismaClient } = require("../../generated/prisma/client")

const prisma = new PrismaClient()

const getUser = async (req, reply) => {
  const { authorization: token } = req.headers
  const { id } = req.params

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    const ValidateToken = dbUser.Token == token ? true : false
    if (!ValidateToken) {
      const erro = { message: 'Token invalido!' }
      return reply.code(400).send(erro)
    }
    return reply.send(dbUser)

  } catch (e) {
    const erro = { message: 'Token invalido!' }
    reply.code(400).send(erro)
  }

};

const LoginUser = async (req, reply) => {
  try {

    const { UserName, Password } = req.body
    const logedUserName = await prisma.user.findUnique({
      where: {
        UserName: UserName
      }
    })

    if (!logedUserName) { return reply.code(500).send(null) }

    const { Password: dataSenha, SaltKey } = logedUserName

    const passToCompare = JSON.stringify(Password) + JSON.stringify(SaltKey)

    const comparePass = await compare(passToCompare, dataSenha)

    if (!comparePass) { return reply.code(500).send(null) }

    return reply.send(logedUserName)

  } catch (err) {
    reply.code(500).send(null);
  }
};

const CreateUser = async (req, reply) => {
  try {

    const { UserName, Email } = req.body;

    const Password = GeneratePassword(8)
    const {
      hashedPassword,
      SaltKey
    } = await getPass(Password)

    const Token = v4();

    console.log('user data ---', UserName)
    console.log('email data ---', Email)

    const user = await prisma.user.create({
      data: {
        UserName,
        Password: hashedPassword,
        Token,
        Email,
        SaltKey,
        myTasks: []
      }
    })

    console.log('user ---- ', user)

    await senPassEmail(Email, Password)

    reply.status(201).send('Senha: ' + Password)


  } catch (err) {
    reply.code(500).send(err);
  }

};

const ChangeUser = async (req, reply) => {

  try {
    const { id } = req.params;
    const { UserName, Password, Email } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: id }
    });
    console.log('Existing User ---------- ', existingUser)
    if (!existingUser) {
      return reply.code(404).send({ message: 'Usuário não encontrado.' });
    }

    let updateData = {
      updatedAt: new Date(),
    }

    if (UserName !== undefined) { updateData.UserName = UserName }
    if (Email !== undefined) { updateData.Email = Email }
    if (Password) {
      const { hashedPassword, SaltKey } = await getPass(Password)

      updateData.Password = hashedPassword;
      updateData.SaltKey = SaltKey;
    }

    console.log('updated User ------------- ', updateData)

    await prisma.user.update({
      where: {
        id
      },
      data: updateData
    })

    reply.code(200).send(ture)

  } catch (err) {
    reply.code(500).send(err)
  }
};

const findEmail = async (req, reply) => {
  const { UserName } = req.body
  try {

    const findUser = await prisma.user.findUnique({
      where: {
        UserName
      }
    })


    if (!findUser) {
      return reply.code(500).send(null)

    }
    reply.send(findUser)


  } catch (e) {
    reply.code(500).send(null)
  }
}

const findPass = async (req, reply) => {
  const { Email } = req.body
  console.log('Email vindo ---- ', Email)
  console.log('env ---- ', process.env.DATABASE_URL)
  console.log('process - ----', process.env)
  try {

    const userFind = await prisma.user.findUnique({
      where: {
        Email
      }
    })

    console.log('User finded ------ ', userFind)

    if (!userFind) { return reply.code(500).send(false) }

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

    reply.send(true)

  } catch (e) {
    console.error('Error ---', e)
    reply.code(500).send(false)
  }
}

module.exports = {
  LoginUser,
  CreateUser,
  getUser,
  ChangeUser,
  findEmail,
  findPass
};
