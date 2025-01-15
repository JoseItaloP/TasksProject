const connection = require("../config");
const getFormatData = require('../functions/FormData').exports


const LoginUser = async (req, reply) => {
  try {
    const con = await connection();
    const [result, table] = await con.query("SELECT * FROM User");
    reply.send(result);
  } catch (err) {
    reply.code(500).send(err);
  }
};



const CreateUser = async (req, reply) => {
  try {
    const con = await connection();
    const { Username, Password, Email } = req.body;
    console.log('UserName: ', Username)
    console.log('Password: ', Password)
    console.log('Email: ', Email)
    const token = 'TestToken'
    const date =  getFormatData();

    await con.query(`INSERT INTO User (UserName,Password,Token,created_at,Email) 
                    VALUES ('${Username}','${Password}','${token}',${date},'${Email}')`);

    const [result, table] = await con.query("SELECT * FROM User");
    reply.send(result[result.length - 1]);
  } catch (err) {
    reply.code(500).send(err);
  }
};

const DropUser = async (req, reply) => {
  try {
    const { id } = req.params;
    const con = await connection();
    await con.query(`DELETE FROM User2 WHERE id=${id}`);

    const [result, table] = await con.query("SELECT * FROM User");
    reply.send(result);
  } catch (err) {
    reply.code(500).send(err);
  }
};

const ChangeUser = async (req, reply) => {
  try{
    const {id} = req.params;
    const {Username, Email} = req.body;
    const con = await connection();
    const date = JSON.stringify(getFormatData());

    if(Username|Email === null){reply.code(500).send('Preencha todos os valores')}

    await con.query(`UPDATE User2 SET UserName='${Username}', Email='${Email}', updated_at=${date} WHERE id=${id}`)

    const [result, table] = await con.query("SELECT * FROM User");
    reply.send(result);

  }catch(err){
    reply.code(500).send(err)
  }
};

module.exports = {
  LoginUser,
  CreateUser,
  DropUser,
  ChangeUser,
};
 