import { FastifyReply, FastifyRequest } from "fastify";
import { ReqTypeTask } from "../types/RouteTypeHamdle";
import { taskType } from "../types/TaskType";
import { UserType } from "../types/UserTypeToFront";

import { PrismaClient } from "../../generated/prisma/client"

const prisma = new PrismaClient()

// const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
//   try {

//     const result: taskType[] = await prisma.tasks.findMany()

//     reply.code(200).send(result);

//   } catch (err) {

//     reply.code(500).send(err);

//   }
// };

const getUserTasks = async (req: FastifyRequest<ReqTypeTask>, reply: FastifyReply) => {
  const { id } = req.params;
  try {
    const userFind: UserType | null = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!userFind) {
      return reply.code(404).send({ message: "Usuário não encontrado" });
    }

    
    const tasks: taskType[] = await prisma.tasks.findMany()

    const filteredTasks = tasks.filter((task) => userFind.myTasks.includes(task.id));

    reply.send(filteredTasks);

  } catch (err) {
    const error = 'Erro ao se comunicar com o servidor'
    console.error(err)
    reply.code(500).send(error);
    
  }
};

const postTasks = async (req: FastifyRequest<ReqTypeTask>, reply: FastifyReply) => {
  try {

    const { Nome, Descricao, Status, Priority, UserID: id } = req.body;

    const findUser: UserType | null = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!findUser)  return reply.code(400).send('Usuario não encontrado.') 
    if(!Nome || !Descricao || !Status || !Priority || !id) return reply.send(400).send('Todos os dados devem ser preenchidos')
    const newTask: taskType = await prisma.tasks.create({
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
    console.error(err)
    reply.code(500).send("Erro ao tentar criar Task.");
  }
};

const deleteTasks = async (req: FastifyRequest<ReqTypeTask>, reply: FastifyReply) => {
  try {
    const { id } = req.params;
    const {UserID} = req.body

    const userEdit = await prisma.user.findUnique({
      where:{
        id: UserID
      }
    })
    if(!userEdit){
      return reply.code(400).send('Usuario não encontrado')
    }

    await prisma.tasks.delete({
      where: {
        id
      }
    })

    const myNewsTasks = userEdit.myTasks.filter((tasksId)=> tasksId !== id)
    await prisma.user.update(({
      where:{
        id: UserID
      },
      data:{
        myTasks: myNewsTasks
      }
    }))

    reply.code(200);
  } catch (err) {
    console.error("Erro: ",err)
    reply.code(500).send('Erro ao Deletar a task');
  }
};

const putTasks = async (req: FastifyRequest<ReqTypeTask>, reply: FastifyReply) => {
  try {

    const { Nome, Descricao, Priority, Status } = req.body;
    const { id } = req.params;

    if (!Nome  || !Descricao || !Priority || !Status ) return reply.code(400).send("Dados preenchidos não chegaram ao banco de dados, tente novamente.");
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

    reply.code(200);
  } catch (err) {
    const error = "Erro ao buscar dados, tente novamente."
    console.error(err)
    reply.code(500).send(error);
  }
};

export {
  // getTasks,
  getUserTasks,
  postTasks,
  deleteTasks,
  putTasks,
};
