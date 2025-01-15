const fastify = require("fastify")({ logger: true });
const cords = require ('@fastify/cors')
fastify.register(cords)
fastify.register(require("./route/task"));
fastify.register(require('./route/user'))


const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
