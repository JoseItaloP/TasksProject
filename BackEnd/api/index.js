const fastify = require('fastify')({ logger: true });

fastify.addHook('onRequest', (req, reply, done) => {
  reply.header('Access-Control-Allow-Origin', 'https://tasks-project-alpha.vercel.app');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  reply.header('Access-Control-Allow-Credentials', 'true'); 
  done();
});


fastify.options('*', (req, reply) => {
  reply.status(204).send();
});

fastify.register(require('./route/user'));
fastify.register(require('./route/task'));

fastify.get('/', async (req, reply) => {
  return reply.send('hello');
});

module.exports = async (req, res) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
};
