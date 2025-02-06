const connection = require('../config')
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

module.exports = {
    virifyUserLogin,
    senPassEmail,
    GeneratePassword
};