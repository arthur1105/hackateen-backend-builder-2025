import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KomuniUI API',
      version: '1.0.0',
      description: 'Documentação da API do KomuniUI - Uma plataforma de comunidade local/regional',
    },
  },
  apis: ['./routes/*.js'], 
};

export const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi };