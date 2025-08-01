const { hash } = require('bcryptjs')

  
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

  async function getPass(Password){
    const SaltKey = GeneratePassword(16);
    const SaltPass = JSON.stringify(Password) + JSON.stringify(SaltKey);
    const hashedPassword = await hash(SaltPass, 8);
    
    return {
      hashedPassword,
      SaltKey
    }
  }

module.exports = {
    GeneratePassword,
    getPass
};