const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Configuração de CORS no Fastify
fastify.register(cors, {
  origin: ['https://tasks-project-alpha.vercel.app'], // Permite apenas este domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Tratamento de requisições OPTIONS manualmente (caso o plugin falhe)
fastify.options('*', (req, reply) => {
  reply
    .header('Access-Control-Allow-Origin', 'https://tasks-project-alpha.vercel.app')
    .header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .status(204)
    .send();
});

// Registrar rotas
fastify.register(require('./route/user'));
fastify.register(require('./route/task'));

fastify.get('/', async (req, reply) => {
  return reply.send('hello');
});

// Exporta a função para Vercel
module.exports = async (req, res) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
};
