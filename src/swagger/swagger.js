const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Invoice Management API',
      version: '1.0.0',
      description: 'API documentation for Invoice Management Microservice',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (min 6 characters)'
            },
            name: {
              type: 'string',
              description: 'User full name'
            }
          }
        },
        Invoice: {
          type: 'object',
          properties: {
            clientName: {
              type: 'string',
              description: 'Name of the client'
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  description: {
                    type: 'string',
                    description: 'Item description'
                  },
                  quantity: {
                    type: 'number',
                    description: 'Quantity of items'
                  },
                  price: {
                    type: 'number',
                    description: 'Price per item'
                  }
                }
              }
            },
            dueDate: {
              type: 'string',
              format: 'date',
              description: 'Invoice due date'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Path to the API routes
};

module.exports = swaggerJsdoc(swaggerOptions);
