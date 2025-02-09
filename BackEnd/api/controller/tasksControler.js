const connection = require("../config");
const getFormatData = require("../functions/FormData").exports;

const getTasks = async (req, reply) => {
  try {

    const con = await connection();

    const [result, table] = await con.query("SELECT * FROM Tasks");

    reply.send(result);

  } catch (err) {

    reply.code(500).send(err);

  }
};

const getUserTasks = async (req, reply) => {
  const { id } = req.params;
  try {
    const con = await connection();

   
    const [result] = await con.query(`SELECT my_tasks FROM User WHERE ID=${id}`);

    if (result.length === 0) {
      return reply.code(404).send({ message: "Usuário não encontrado" });
    }

    
    const [tasks] = await con.query("SELECT * FROM Tasks");

    const filteredTasks = tasks.filter((task) => result[0].my_tasks.includes(task.ID));

    reply.send(filteredTasks);

  } catch (err) {

    console.error("Erro ao buscar tarefas do usuário:", err);
    reply.code(500).send(err);
    
  }
};

const postTasks = async (req, reply) => {
  try {
    const { Name,Descrição,Status, Priority, UserID } = req.body;
    
    

    const data = getFormatData();
    const con = await connection();

    await con.query(`INSERT INTO Tasks (Nome, Descricao, Status, Priority, created_at)
                        VALUES ('${Name}', '${Descrição}', '${Status}', '${Priority}', ${data})`);

    const [result, table] = await con.query("SELECT * FROM Tasks");

    const [UserAtual, UserTable] = await con.query(`SELECT my_tasks FROM User WHERE ID=${UserID}`)

    const UserTasks = UserAtual

    UserTasks.push(result[result.length - 1].ID)

    await con.query(`UPDATE User SET my_tasks=JSON_ARRAY(${UserTasks}) WHERE ID=${UserID}`)

    reply.send(true);

  } catch (err) {
    reply.code(500).send(err);
  }
};

const deleteTasks = async (req, reply) => {
  try {
    const { id } = req.params;
    const con = await connection();
    await con.query(`DELETE FROM Tasks WHERE id_task=${id}`);

    const [result, table] = await con.query("SELECT * FROM Tasks");
    reply.send(result);
  } catch (err) {
    reply.code(500).send(err);
  }
};

const putTasks = async (req, reply) => {
  try {
    const { Name, Descrição, Priority, Status } = req.body;
    if (Name | Descrição | (Priority === null)| (Status === null))
      return reply.code(500).send("Preencha todos os valores");
    const { id } = req.params;
    const data = getFormatData()

    const con = await connection();
    await con.query(
      `UPDATE Tasks SET Nome='${Name}', Descricao='${Descrição}', Status='${Status}', Priority='${Priority}', updated_at=${data} WHERE ID=${id}`
    );

    const [result, table] = await con.query("SELECT * FROM Tasks");
    reply.send(result);
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
