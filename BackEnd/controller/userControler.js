const nodemailer = require("nodemailer")

const connection = require("../config");
const getFormatData = require('../functions/FormData').exports

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

function GeneratePassword(){
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
      let passwordLength = 16;
      let password = "";

      for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      return password
}

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
    const { Username, Email } = req.body;
    const token = 'token'
    
    const verify = await virifyUserLogin(Username, Email)
    console.log('verify: ', verify)
    if(verify) {
      console.log('reply erro')
      return reply.code(500).send('Usuario ou Email ja cadastrados, tente outro.')
    }else{
      const Password = GeneratePassword()
      const date =  getFormatData();
  
      await con.query(`INSERT INTO User (UserName,Password,Token,created_at,Email) 
                      VALUES ('${Username}','${Password}','${token}',${date},'${Email}')`);
      
      const sendData = await senPassEmail(Email, Password)
      console.log(sendData)
  
      
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

    await con.query(`UPDATE User SET UserName='${Username}', Password='${Password}', Email='${Email}', updated_at=${date} WHERE ID=${id}`)

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
 