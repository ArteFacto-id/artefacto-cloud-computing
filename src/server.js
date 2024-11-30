const { artifactRoute } = require('./routes/artifactRoute');
const Hapi = require('@hapi/hapi');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: true
    }
  });

  server.route(artifactRoute);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

init();