const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');
const Painting = require('./models/Painting');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

mongoose.connect('mongodb://ofriberg:ObcF0056wew@ds119345.mlab.com:19345/ofribergdb');
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

// create a new instance of a hapi server
const server = hapi.server({
    port: process.env.PORT || '3000',
    host: '192.168.10.104' || 'localhost'
});



const init = async() => {

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'Paintings API Documentation',
                    version: Pack.version
                }
            }
        }
    ]);

    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
    });

    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    });

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
            config: {
                description: 'Get all paintings',
                tags: ['api', 'v1', 'painting']
            },
            handler: (request, reply) => { // what will happen if that path is reached?
                return Painting.find();
            }
        },
        {
            method: 'POST', // what's the method
            path: '/api/v1/paintings', // what's the path?
            config: {
                description: 'Get all specific painting',
                tags: ['api', 'v1', 'painting']
            },
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