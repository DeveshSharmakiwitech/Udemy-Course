const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition:{
        info:{
            title:"Udemy Course tutorial",
            version:'1.0.0',
        },
        schemes: [
            'http',
          ],
        // servers:[
        //     {
        //         url:"http",
        //     },
        // ],
        produces: ['application/x-www-form-urlencoded', 'application/json'],
        consumes: ['application/x-www-form-urlencoded', 'application/json'],
        securityDefinitions: {
            Basic: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
            },
          },  
        // basePath: '/api/v1',
        },
        apis: ['./src/routers/user.js'],
};

module.exports= swaggerJsdoc(options)