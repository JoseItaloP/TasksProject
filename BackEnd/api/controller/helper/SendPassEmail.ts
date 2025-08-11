import { SentMessageInfo } from "nodemailer"
import nodemailer from "nodemailer"

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

async function senPassEmail(Email: string, Senha: string) {
  const configEmail = {
    from: "verifyers843@gmail.com",
    to: `${Email}`,
    subject: "Senha do site de tarefas",
    html: `<h1>Esta será a senha da sua conta:</h1>
            <strong>${Senha}</strong>
    `
  }

  return await new Promise<SentMessageInfo>((resolve, reject) => {
    smtp.sendMail(configEmail).then((res: SentMessageInfo) => {
      smtp.close()
      resolve(res)
    }).catch((error: any) => {
      console.error('Error: ', error)
      reject('Erro in send Email')
    })
  })

}

export {
    senPassEmail
}