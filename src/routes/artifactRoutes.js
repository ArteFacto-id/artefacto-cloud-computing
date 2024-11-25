const artifactHandler = require('../handlers/artifactHandler');

module.exports = [
  {
    method: 'GET',
    path: '/temples/{templeId}/artefacts',
    handler: artifactHandler.getArtifactsByTemple
  },
  {
    method: 'GET',
    path: '/artefacts/{id}',
    handler: artifactHandler.getArtifactById
  }
];
