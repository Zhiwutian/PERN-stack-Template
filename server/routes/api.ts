import { Router } from 'express';
import { readHealth } from '../controllers/health-controller.js';
import { readHello } from '../controllers/hello-controller.js';

const apiRouter = Router();

apiRouter.get('/hello', readHello);
apiRouter.get('/health', readHealth);

export default apiRouter;
