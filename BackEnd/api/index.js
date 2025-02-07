
const fastify = require('fastify')({logger: true})
fastify.register(require('@fastify/cors')())
fastify.register(require('./route/user'))
fastify.register(require('./route/task'))

fastify.get('/', async (req, reply) => {
  return reply.send('hello')
})

export default async function handler(req, reply) {
  await fastify.ready()
 
  // reply.setHeader('Access-Control-Allow-Origin', '*')
  // reply.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  
  fastify.server.emit('request', req, reply)
}

