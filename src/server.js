const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const db = require('./config/database');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: 'localhost',
    routes: {
      cors: true,
      validate: {
        failAction: async (request, h, err) => {
          throw err;
        }
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(err);
});

init();