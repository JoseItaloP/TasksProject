const nodemailer = require("nodemailer")

const smtp = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "verifyers843@gmail.com",
    pass: "tzja ywez jjmw gozi"
  },
  tls: {
    ciphers: 'SSLv3'
  }
})

async function senPassEmail(Email, Senha) {
  const configEmail = {
    from: "verifyers843@gmail.com",
    to: `${Email}`,
    subject: "Senha do site de tarefas",
    html: `<h1>Esta será a senha da sua conta:</h1>
            <strong>${Senha}</strong>
    `
  }

  return await new Promise((resolve, reject) => {
    smtp.sendMail(configEmail).then(res => {
      smtp.close()
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })

}

module.exports = {
    senPassEmail
}