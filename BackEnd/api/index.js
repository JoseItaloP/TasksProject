
const fastify = require('fastify')({logger: true})
fastify.register(require('@fastify/cors'))
fastify.register(require('./route/user'))
fastify.register(require('./route/task'))

fastify.get('/', async (req, reply) => {
  return reply.send('hello')
})

export default async function handler(req, reply) {
  await fastify.ready()
  fastify.server.emit('request', req, reply)
}

