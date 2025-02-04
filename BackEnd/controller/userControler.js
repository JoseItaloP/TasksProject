
const nodemailer = require("nodemailer")
const {v4} = require("uuid")
const connection = require("../config");
const getFormatData = require('../functions/FormData').exports
const {hash, compare} = require('bcryptjs')

const smtp = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth:{
    user: "verifyers843@gmail.com",
    pass: "tzja ywez jjmw gozi"
  },
  tls: {
    ciphers: 'SSLv3'
  }
})

async function virifyUserLogin(UserName, Email){
  const con = await connection();
  const [result, table] = await con.query("SELECT * FROM User");
  const resposta = result.map((user)=>{
    if(user.UserName == UserName || user.Email == Email){
      return true
    }
  })
  const isTrue = resposta.find((value)=>value === true)
  if(isTrue){
    return true
  }else{
    return false
  }
}

async function senPassEmail(Email, Senha){
  const configEmail = {
    from: "verifyers843@gmail.com",
    to: `${Email}`,
    subject: "Senha do site de tarefas",
    html: `<h1>Esta será a senha da sua conta:</h1>
            <strong>${Senha}</strong>
    `
  }
  new Promise((resolve, reject)=>{
    smtp.sendMail(configEmail).then(res => {
      smtp.close()
      return resolve(res)
    }).catch(error => {
      console.error(error)
    })
  })


}

function GeneratePassword(PassLen){
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
      let passwordLength = PassLen;
      let password = "";

      for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      return password
}


const getUsers = async (req, reply) => {
  try {
    const con = await connection();
    const [result, table] = await con.query("SELECT * FROM User");
    reply.send(result);
  } catch (err) {
    reply.code(500).send(err);
  }
};

const getUser = async (req,reply) =>{
  const {authorization} = req.headers
  const token = authorization
  const {id} = req.params
  try{

    const con = await connection();
    const [result, table] = await con.query(`SELECT * FROM User WHERE ID = ${id}`)

    const ValidateToken = result[0].Token === token ? true : false
    

    if(ValidateToken){
      reply.send(result[0])
    }else{
      const erro = {message: 'Token invalido!'}
      reply.code(400).send(erro)
    }
  }catch(e){
    const erro = {message: 'Token invalido!'}
    reply.code(400).send(erro)
  }
};

const LoginUser = async (req, reply) => {
  try {
    const con = await connection();
    const {UserName, Password} = req.body

    const [result, table] = await con.query("SELECT * FROM User");
    const logedUserName = result.find(
      (user) => user.UserName === UserName
    );
    if(logedUserName){
      const {Password: dataSenha, Salt_Key} = logedUserName

      const passToCompare = JSON.stringify(Password) + JSON.stringify(Salt_Key)

      const comparePass = await compare(passToCompare, dataSenha)

      console.log('comparação de senha com salt_key: ', comparePass)

      if(comparePass){

        reply.send(logedUserName)

      }else{
        reply.code(500).send(null)
      }
    }else{
      reply.code(500).send(null)
    }
  } catch (err) {
    reply.code(500).send(err);
  }
};



const CreateUser = async (req, reply) => {
  try {
    const con = await connection();

    const { Username, Email } = req.body;
    
    const verify = await virifyUserLogin(Username, Email)
  

    if(verify) {
    
      return reply.code(500).send('Usuario ou Email ja cadastrados, tente outro.')
    }else{
      
      const Password = GeneratePassword(8)
      const SaltK = GeneratePassword(16)
      const SaltPass = JSON.stringify(Password) + JSON.stringify(SaltK)

      const hashedPassword = await hash(SaltPass, 8)

      const date =  getFormatData();
      const token = v4();

      await con.query(`INSERT INTO User (UserName,Password,Token,created_at,Email, Salt_key) 
                      VALUES ('${Username}','${hashedPassword}','${token}',${date},'${Email}', '${SaltK}')`);
      
      const sendData = await senPassEmail(Email, Password)
      
      reply.code(200)
    }

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
    const {Username,Password, Email} = req.body;
    const con = await connection();
    const date = getFormatData();
    if(Password){
      const SaltK = GeneratePassword(16)
      const SaltPass = JSON.stringify(Password) + JSON.stringify(SaltK)
      const hashedPassword = await hash(SaltPass, 8)
  
      await con.query(`UPDATE User SET UserName='${Username}', Password='${hashedPassword}', Email='${Email}', Salt_Key='${SaltK}', updated_at=${date} WHERE ID=${id}`)
  
      const [result] = await con.query("SELECT * FROM User");
      reply.send(result);
    }else{
      await con.query(`UPDATE User SET UserName='${Username}',  Email='${Email}', updated_at=${date} WHERE ID=${id}`)
  
      const [result] = await con.query("SELECT * FROM User");
      reply.send(result);
    }


  }catch(err){
    reply.code(500).send(err)
  }
};

const findEmail = async (req,reply)=>{
  const {UserName} = req.body
  try{

    const con = await connection();

    const [result, table] = await con.query(`SELECT * FROM User WHERE UserName='${UserName}'`)
    
    if(result.length>0){
      reply.send(result[0])
    }else{
      reply.code(500).send(null)
    }

  }catch(e){
    reply.code(500).send(null)
  }
}

const findPass = async (req,reply)=>{
  const {Email} = req.body
  try{

    const con = await connection();

    const [result, table] = await con.query(`SELECT * FROM User WHERE Email='${Email}'`)
    console.log('result:', result[0])
    if(result[0]){
      console.log('entrou')
      const Password = GeneratePassword(8)
      const SaltK = GeneratePassword(16)
      const SaltPass = JSON.stringify(Password) + JSON.stringify(SaltK)

      const hashedPassword = await hash(SaltPass, 8)
      const dateUpdate = getFormatData();

      await con.query(`UPDATE User SET Password='${hashedPassword}', updated_at=${dateUpdate}, Salt_Key='${SaltK}' WHERE ID=${result[0].ID}`)

      const sendData = await senPassEmail(Email, Password)
      reply.send(true)
    }else{
      reply.code(500).send(false)
    }

  }catch(e){
    reply.code(500).send(false)
  }
}

module.exports = {
  LoginUser,
  getUsers,
  CreateUser,
  getUser,
  DropUser,
  ChangeUser,
  findEmail,
  findPass
};
 