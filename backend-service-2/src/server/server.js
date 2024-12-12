const routes = require('./routes');
const Hapi = require('@hapi/hapi');
require('dotenv').config();
const validateToken = require('../services/validateToken');

const init = async () => {
  const server = Hapi.server({
    port: process.env.ENV_PORT,
    host: process.env.HOST,
    routes: {
      cors: true
    }
  });

  server.ext('onPreHandler', validateToken);

  
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

init();