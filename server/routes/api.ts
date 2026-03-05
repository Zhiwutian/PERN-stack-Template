import { Router } from 'express';
import { readHealth } from '../controllers/health-controller.js';
import { readHello } from '../controllers/hello-controller.js';
import {
  deleteTodo,
  getTodos,
  patchTodo,
  postTodo,
} from '../controllers/todo-controller.js';

const apiRouter = Router();

apiRouter.get('/hello', readHello);
apiRouter.get('/health', readHealth);
apiRouter.get('/todos', getTodos);
apiRouter.post('/todos', postTodo);
apiRouter.patch('/todos/:todoId', patchTodo);
apiRouter.delete('/todos/:todoId', deleteTodo);

export default apiRouter;
