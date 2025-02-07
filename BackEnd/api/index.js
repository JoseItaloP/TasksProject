
const fastify = require('fastify')({logger: true})

fastify.register(require('./route/user'))
fastify.register(require('./route/task'))

fastify.get('/', async (req, reply) => {

  reply.setHeader('Access-Control-Allow-Origin', '*')
  reply.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return reply.send('hello')
})

export default async function handler(req, reply) {
  reply.setHeader('Access-Control-Allow-Origin', '*')
  reply.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  await fastify.ready()
  fastify.server.emit('request', req, reply)
}

