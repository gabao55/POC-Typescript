import express from 'express';
import taskRouter from './routers/task.router.js';
var server = express();
server.use(express.json());
server.use(taskRouter);
server.listen(4000, void console.log("Listening to PORT 4000"));
