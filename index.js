// require hapi dependency
const hapi = require('hapi');
const mongoose = require('mongoose');

const Painting = require('./models/Painting');

mongoose.connect('mongodb://ofriberg:ObcF0056wew@ds119345.mlab.com:19345/ofribergdb');
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

// create a new instance of a hapi server
const server = hapi.server({
    port: 4000,
    host: 'localhost'
});



const init = async() => {

    server.route([{
            method: 'GET', // what's the method
            path: '/', // what's the path?
            handler: function(request, reply) { // what will happen if that path is reached?
                return `<h1>modern api test</h1>`
            }
        },
        {
            method: 'GET', // what's the method
            path: '/api/v1/paintings', // what's the path?
            handler: (request, reply) => { // what will happen if that path is reached?
                return Painting.find();
            }
        },
        {
            method: 'POST', // what's the method
            path: '/api/v1/paintings', // what's the path?
            handler: (request, reply) => { // what will happen if that path is reached?
                const { name, url, techniques } = request.payload;
                const painting = new Painting({
                    name,
                    url,
                    techniques
                });
                return painting.save();
            }
        },

    ]);
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};

init();