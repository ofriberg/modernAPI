// require hapi dependency
const hapi = require('hapi'); 
const mongoose = require('mongoose');

// create a new instance of a hapi server
const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async () => {

    server.route({
        method: 'GET', // what's the method
        path: '/', // what's the path?
        handler: function(request, reply) { // what will happen if that path is reached?
            return `<h1>modern api test</h1>`
        }
    });
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};

init();
 