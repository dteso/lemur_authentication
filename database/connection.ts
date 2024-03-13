import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

export const dbConnector = () => {
    dotenv.config();
    return new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASS || '', {
        host: process.env.DB_HOST || '',
        port: +(process.env.DB_PORT || ''),
        dialect: 'postgres',
        logging: process.env.LOGGING === 'true' ? true : false,
    });
}
