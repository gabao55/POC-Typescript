import express from 'express';
import taskRouter from './routers/task.router.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const server = express();
server
    .use(express.json())
    .use(taskRouter)
    .use(cors());

server.listen(process.env.PORT, void console.log(`Listening to PORT ${process.env.PORT}`));