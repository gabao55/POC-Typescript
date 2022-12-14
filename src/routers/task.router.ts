import express from 'express';
import { deleteTask, insertTask, listResponsibleTasks, listTasks, switchTaskStatus } from '../controllers/task.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';
import { validateTaskId } from '../middlewares/task.middleware.js';

const router = express.Router();

router.get('/tasks', listTasks);
router.get('/tasks/:responsibleId', listResponsibleTasks);

router.use(validateToken);

router.post('/tasks', insertTask);
router.patch('/tasks/:taskId', validateTaskId, switchTaskStatus);
router.delete('/tasks/:taskId', validateTaskId, deleteTask);

export default router;