
const { PrismaClient } = require("../../generated/prisma/client")

const prisma = new PrismaClient()

/*test
{"id":"688a6d93c177b94408372afc","Nome":"TestTASK","Descricao":"Task descricao","Status":"Atuando","Priority":"Média","createdAt":"2025-07-30T19:08:03.973Z","updatedAt":null}
*/

const getTasks = async (req, reply) => {
  try {

    const result = await prisma.tasks.findMany()

    reply.code(200).send(result);

  } catch (err) {

    reply.code(500).send(err);

  }
};

const getUserTasks = async (req, reply) => {
  const { id } = req.params;
  try {
    const userFind = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!userFind) {
      return reply.code(404).send({ message: "Usuário não encontrado" });
    }

    
    const tasks = await prisma.tasks.findMany()

    const filteredTasks = tasks.filter((task) => userFind.myTasks.includes(task.id));

    reply.send(filteredTasks);

  } catch (err) {
    reply.code(500).send(err);
    
  }
};

const postTasks = async (req, reply) => {
  try {

    const { Nome, Descricao, Status, Priority, UserID: id } = req.body;

    const findUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (findUser == null) { return reply.code(500).send('Usuario não encontrado.') }

    const newTask = await prisma.tasks.create({
      data: {
        Nome,
        Descricao,
        Status,
        Priority
      }
    })

    const UserTasks = findUser.myTasks

    UserTasks.push(newTask.id)

    await prisma.user.update({
      where: {
        id
      },
      data: {
        myTasks: UserTasks
      }
    })

    reply.code(201).send(newTask);

  } catch (err) {
    reply.code(500).send(err);
  }
};

const deleteTasks = async (req, reply) => {
  try {
    const { id } = req.params;
    await prisma.tasks.delete({
      where: {
        id
      }
    })

    const tasksFetch = await prisma.tasks.findMany()

    reply.code(200).send(tasksFetch);
  } catch (err) {
    reply.code(500).send(err);
  }
};

const putTasks = async (req, reply) => {
  try {

    const { Nome, Descricao, Priority, Status } = req.body;
    const { id } = req.params;

    if ((Nome === null) | (Descricao === null) | (Priority === null) | (Status === null))
      return reply.code(500).send("Preencha todos os valores");
    const data = new Date()

    await prisma.tasks.update({
      where: {
        id
      },
      data: {
        Nome,
        Descricao,
        Priority,
        Status,
        updatedAt: data
      }
    })

    const tasksFetch = await prisma.tasks.findMany()


    reply.code(200).send(tasksFetch);
  } catch (err) {
    reply.code(500).send(err);
  }
};

module.exports = {
  getTasks,
  getUserTasks,
  postTasks,
  deleteTasks,
  putTasks,
};
