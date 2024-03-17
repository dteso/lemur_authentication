import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: './production.env' });
    console.log(`>>> CURRENT ENVIRONMENT IS : 'PRODUCTION'`);
    console.log(`>>> TARGETING DATABASE IN HOST : [${process.env.DB_HOST}]`);
} else {
    dotenv.config({ path: './.env' });
    console.log(`>>> CURRENT ENVIRONMENT IS : 'DEVELOPMENT'`);
    console.log(`>>> TARGETING DATABASE IN HOST : [${process.env.DB_HOST}]`);
}

export const dbConnector = () => {
    return new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASS || '', {
        host: process.env.DB_HOST || '',
        port: +(process.env.DB_PORT || ''),
        dialect: 'postgres',
        logging: process.env.LOGGING === 'true' ? true : false,
        dialectOptions: process.env.PRODUCTION === 'true' ? {
            ssl: {
                require: true, // Habilitar SSL en producción 
                rejectUnauthorized: false // Solo para pruebas locales, no lo uses en producción sin configurar el certificado adecuadamente
            }
        } : {}
    });
}
