const fastify = require('fastify')({ logger: true });

// Middleware para definir CORS em todas as respostas
fastify.addHook('onRequest', (req, reply, done) => {
  reply.header('Access-Control-Allow-Origin', 'https://tasks-project-alpha.vercel.app');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  reply.header('Access-Control-Allow-Credentials', 'true'); // Se precisar de cookies/autenticação
  done();
});

// Tratar requisições OPTIONS separadamente (preflight)
fastify.options('*', (req, reply) => {
  reply.status(204).send();
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
