import { Client } from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

async function createRolePermissionsTable() {
    dotenv.config();
    // Cargar el contenido del archivo SQL
    const sqlFilePath = 'database/create-role-permissions.sql'; // Reemplaza esto con la ruta de tu archivo SQL
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8');

    // Configurar la conexión a la base de datos PostgreSQL
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: 5432, // Puerto predeterminado de PostgreSQL
    });

    try {
        await client.connect(); // Conectar a la base de datos
        await client.query(sqlScript); // Ejecutar el script SQL
        console.log('Script SQL ejecutado correctamente');
    } catch (error) {
        console.error('Error al ejecutar el script SQL:', error);
    } finally {
        await client.end(); // Cerrar la conexión a la base de datos
    }
}

createRolePermissionsTable();
