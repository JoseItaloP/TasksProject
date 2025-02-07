const connection = require('../config')


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
    GeneratePassword
};