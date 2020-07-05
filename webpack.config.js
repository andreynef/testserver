const clientConfig = require('./cfg/webpack.client.config');
const serverConfig = require('./cfg/webpack.server.config');

module.exports = [//генерит бандлы поочереди
    clientConfig,
    serverConfig,
]
