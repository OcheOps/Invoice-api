const swaggerDefinition = {
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
      schemas: {
        UserRegistration: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 6,
              description: 'User password (min 6 characters)'
            },
            name: {
              type: 'string',
              description: 'User full name'
            }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password'
            }
          }
        },
        InvoiceItem: {
          type: 'object',
          required: ['description', 'quantity', 'price'],
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
        },
        InvoiceCreate: {
          type: 'object',
          required: ['clientName', 'items', 'dueDate'],
          properties: {
            clientName: {
              type: 'string',
              description: 'Name of the client'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/InvoiceItem'
              }
            },
            dueDate: {
              type: 'string',
              format: 'date',
              description: 'Invoice due date'
            }
          }
        },
        InvoiceResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Invoice ID'
            },
            invoiceNumber: {
              type: 'string',
              description: 'Generated invoice number'
            },
            clientName: {
              type: 'string',
              description: 'Name of the client'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/InvoiceItem'
              }
            },
            total: {
              type: 'number',
              description: 'Total invoice amount'
            },
            status: {
              type: 'string',
              enum: ['draft', 'sent', 'paid', 'cancelled'],
              description: 'Invoice status'
            },
            dueDate: {
              type: 'string',
              format: 'date',
              description: 'Invoice due date'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Invoice creation timestamp'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js']
  };
  
  module.exports = options;