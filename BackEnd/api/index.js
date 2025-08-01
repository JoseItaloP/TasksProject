const fastify = require('fastify')({ logger: true });

// reply.header('Access-Control-Allow-Origin', 'https://tasks-project-alpha.vercel.app');

fastify.addHook('onRequest', (req, reply, done) => {
  reply.header('Access-Control-Allow-Origin', `${process.env.FRONT_URL}`);
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


// module.exports = async (req, res) => {
//   await fastify.ready();
//   fastify.server.emit('request', req, res);
// };

const start = async () => {
  try {
    await fastify.listen({ port: 3333 }); // Passa a porta como um objeto
    console.log(`🚀 Servidor Fastify rodando em http://localhost:3333`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

