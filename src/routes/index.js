const templeRoutes = require('./templeRoutes');
const artifactRoutes = require('./artifactRoutes');
const authRoutes = require('./auth');

module.exports = [
  ...templeRoutes,
  ...artifactRoutes,
  ...authRoutes
];
