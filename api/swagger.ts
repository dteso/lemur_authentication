/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DOCKER SWAGGER NODE TS API REST",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "yourName",
                url: "https://yourdomain.com",
                email: "youremail@email.com",
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [{}]
    },
    apis: ["./api/routes/*.ts"],
};

export const swaggerDocs = (app: any, port: any) => {

    options.definition.servers = [
        {
            url: "http://localhost:" + port,
        },
    ];

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
    app.use('/api/v1/docs.json', (req: any, res: any) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`[INFO] Swagger Docs available at http://localhost:${port}/api/v1/docs`);
}

