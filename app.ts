import dotenv from 'dotenv';
import Server from './servers/server';
dotenv.config();

console.log("[INFO] STARTING NODE-TS SERVER");

const server = new Server();

server.listen();
