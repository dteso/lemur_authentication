import { Client } from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

export function executePgQuery(sqlFilePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        console.info("[EXECUTING_SCRIPT]: " + sqlFilePath);

        dotenv.config();
        // Cargar el contenido del archivo SQL
        const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8');

        // Configurar la conexión a la base de datos PostgreSQL
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: 5432, // Puerto predeterminado de PostgreSQL
        });

        client.connect()
            .then(() => client.query(sqlScript))
            .then(() => {
                console.log(`Script ${sqlFilePath} ejecutado correctamente`);
                resolve();
            })
            .catch(error => {
                console.error(`ERROR AL EJECTUTAR SCRIPT SQL ${sqlFilePath} ---> `, error);
                reject(error);
            })
            .finally(() => client.end()); // Cerrar la conexión a la base de datos
    });
}
