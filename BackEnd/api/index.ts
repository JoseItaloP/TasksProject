// const fastify = require('fastify')({ logger: true });
// const { fastifySwagger } = require('@fastify/swagger')
// const { fastifySwaggerUi } = require('@fastify/swagger-ui')

import { fastify, FastifyReply, FastifyRequest } from 'fastify';
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { ZodTypeProvider } from 'fastify-type-provider-zod';
import UserRoute from './route/user';
import TaskRoute from './route/task';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.addHook('onRequest', (request, reply, done) => {
  reply.header('Access-Control-Allow-Origin', `${process.env.FRONT_URL}`);
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  reply.header('Access-Control-Allow-Credentials', 'true');
  done();
});


app.options('*', (req, reply) => {
  reply.status(204).send();
});

app.register(UserRoute);
app.register(TaskRoute);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'ToDo List API',
      version: '1.0.0'
    }
  }
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.get('/', async (req, reply) => {
  return reply.send('hello');
});


if (process.env.TESTING_ENV === "false") {
  module.exports = async (req: FastifyRequest, res: FastifyReply) => {
    await app.ready();
    app.server.emit('request', req, res);
  };
}
export = app 