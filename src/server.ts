import express from 'express';
import taskRouter from './routers/task.router.js';
import dotenv from 'dotenv';
dotenv.config();

const server = express();
server.use(express.json());

server.use(taskRouter);

server.listen(process.env.PORT, void console.log(`Listening to PORT ${process.env.PORT}`));