import { fastify, FastifyReply, FastifyRequest } from 'fastify';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { ZodTypeProvider } from 'fastify-type-provider-zod';
import UserRoute from '../../../user'
import TaskRoute from '../../../task';

let app: any;

  const newApp = fastify().withTypeProvider<ZodTypeProvider>();

  newApp.setValidatorCompiler(validatorCompiler);
  newApp.setSerializerCompiler(serializerCompiler);

  newApp.addHook('onRequest', (request, reply, done) => {
    reply.header('Access-Control-Allow-Origin', `${process.env.FRONT_URL}`);
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    reply.header('Access-Control-Allow-Credentials', 'true');
    done();
  });

  newApp.options('*', (req, reply) => {
    reply.status(204).send();
  });

  newApp.register(UserRoute);
  newApp.register(TaskRoute);

  newApp.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'ToDo List API',
        version: '1.0.0'
      }
    }
    });

  newApp.register(fastifySwaggerUi, {
    routePrefix: '/docs'
    });

  newApp.get('/', async (req, reply) => {
    return reply.send('Hello, world!');
  });

  app = newApp;
  export {app}
