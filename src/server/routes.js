const validateToken = require('../services/validateToken');
const {} = require('./handler')

const artifactRoute = [
    {
        method:'GET',
        path:'/temples/{templeId}/artifact',
        handler:()=>{}
    }
];

module.exports = artifactRoute;