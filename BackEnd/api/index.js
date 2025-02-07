
const fastify = require('fastify')({logger: true})
// fastify.register(require('@fastify/cors'))
fastify.register(require('./route/user'))
fastify.register(require('./route/task'))

fastify.get('/', async (req, reply) => {
  return reply.send('hello')
})

export default async function handler(req, reply) {
  await fastify.ready()
  reply.setHeader('Access-Control-Allow-Credentials', true)
  reply.setHeader('Access-Control-Allow-Origin', '*')

  reply.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  reply.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  fastify.server.emit('request', req, reply)
}

