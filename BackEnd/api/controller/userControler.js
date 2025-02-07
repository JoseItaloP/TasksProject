const {v4} = require("uuid")
const connection = require('../config')
const getFormatData = require('../functions/FormData').exports
const {hash, compare} = require('bcryptjs')
const {
  virifyUserLogin,
  GeneratePassword
} = require('../functions/UserSuporte')
const nodemailer = require("nodemailer")

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
      const {Password: dataSenha, Salt_key} = logedUserName

      const passToCompare = JSON.stringify(Password) + JSON.stringify(Salt_key)

      const comparePass = await compare(passToCompare, dataSenha)

      if(comparePass){

        reply.send(logedUserName)

      }else{
        reply.code(500).send(null)
      }
    }else{
      reply.code(500).send(null)
    }
  } catch (err) {
    reply.code(500).send(null);
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
    
    if(result[0]){
      const Password = GeneratePassword(8)
      console.log('senha: ', Password)
      const SaltK = GeneratePassword(16)
      const SaltPass = JSON.stringify(Password) + JSON.stringify(SaltK)

      const hashedPassword = await hash(SaltPass, 8)
      const dateUpdate = getFormatData();

      await con.query(`UPDATE User SET Password='${hashedPassword}', updated_at=${dateUpdate}, Salt_Key='${SaltK}' WHERE ID=${result[0].ID}`)

      const sendData = await senPassEmail(Email, Password)
      console.error('resultado: ', sendData)
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
  CreateUser,
  getUser,
  ChangeUser,
  findEmail,
  findPass
};
 