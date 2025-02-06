import Fastify from 'fastify'
import UserRoute from './route/user'
import TaskRoute from './route/task'
import cors from '@fastify/cors'

const app = Fastify({
  logger: true,
});
await app.register(cors)
app.register(UserRoute)
app.register(TaskRoute)

app.get('/', async (req, reply) => {
  return reply.send('hello')
})

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

