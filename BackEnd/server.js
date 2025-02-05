require('dotenv').config()
import Fastify  from 'fastify';
import cords from '@fastify/cors'
import TaskRoute from './route/task'
import UserRoute from './route/user';
const app = Fastify({
  logger: true,
})
app.register(cords)
app.register(TaskRoute);
app.register(UserRoute)

app.get('/hello',()=>{
  return 'hello'
})

app.listen({port: process.env.PORT_CONNECTION}).then(()=>{
  console.log('conected')
})

// const start = async () => {
//   try {
//     await fastify.listen({ port: process.env.PORT_CONNECTION });
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// start();
