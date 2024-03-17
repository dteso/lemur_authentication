
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import userRoutes from '../api/routes/user.routes';
import authRoutes from '../api/routes/auth.routes';
import roleRoutes from '../api/routes/role.routes';
import permissionRoutes from '../api/routes/permission.routes';
import cors from 'cors';
import { dbConnector } from "../database/connection";
import { swaggerDocs as V1SwaggerDocs } from '../api/swagger'
import { createAssociations } from '../dal/models/associations';


const app = express();

class Server {
    private apiPaths = {
        auth: '/api/auth',
        users: '/api/users',
        roles: '/api/roles',
        permissions: '/api/permissions',
        userRoles: '/api/user-roles',
        rolePermissions: '/api/role-permissions',
    }

    constructor() {

        console.log(`[INFO] Connecting to database [${process.env.DB_NAME}] - ip: ${process.env.DB_HOST}:${process.env.DB_PORT} whith user ${process.env.DB_USER}`);
        console.log(`[INFO] Using configured port [${process.env.APP_PORT}]`);

        this.dbConnection();
        this.middlewares();
        this.routes();
        createAssociations();
    }

    //Conectar base de datos
    dbConnection() {
        try {
            dbConnector().authenticate();
            console.log('[SUCCESS] Database online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        // CORS
        app.use(cors());
        // Lectura del body
        app.use(express.json()); // Permite que veamos en las peticiones que lleven body el propio body. Sin esto no se parsea en body en la request
        // Carpeta pública
        app.use(express.static('public'));
    }

    routes() {
        app.use(this.apiPaths.users, userRoutes);
        app.use(this.apiPaths.auth, authRoutes);
        app.use(this.apiPaths.roles, roleRoutes);
        app.use(this.apiPaths.permissions, permissionRoutes);
    }

    listen() {
        const port = process.env.APP_PORT || '4410';
        console.log("[INFO] Logs: " + process.env.LOGGING);
        console.log(`[SUCCESS] CONNECTED to database [${process.env.DB_NAME}] - IP/URI: [${process.env.DB_HOST}:${process.env.DB_PORT}] whith user [${process.env.DB_USER}]`);
        console.log("[WARNING] >>>> Attemting to serve on port: " + process.env.APP_PORT);
        app.listen(port, () => {
            console.log('[SUCCESS] SERVER RUNNING ON PORT: ' + port);
            V1SwaggerDocs(app, port);
        });
    }
}



export default Server;