const connection = require('../config')

const LoginUser = async (req, reply) => {
  const con = await connection()
  const list = con.query('SELECT * FROM User')
  let result = []
  result.push(list)
  reply.send(result)
};

const CreateUser = (req, reply) => {};

const DropUser = (req, reply) => {};

const ChangeUser = (req, reply) => {};

module.exports = {
  LoginUser,
  CreateUser,
  DropUser,
  ChangeUser,
};
