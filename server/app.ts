import express from 'express';
import apiRouter from './routes/api.js';
import { errorMiddleware, httpLogger } from './lib/index.js';

/**
 * Construct and configure the Express application instance.
 * Keep server startup concerns in `server.ts`.
 */
export function createApp(): express.Express {
  const app = express();

  // Create paths for static directories.
  const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
  const uploadsStaticDir = new URL('public', import.meta.url).pathname;

  app.use(express.static(reactStaticDir));
  // Static directory for file uploads server/public/.
  app.use(express.static(uploadsStaticDir));
  app.use(httpLogger);
  app.use(express.json());

  app.use('/api', apiRouter);

  /*
   * Handles paths that aren't handled by any other route handler.
   * It responds with `index.html` to support page refreshes with React Router.
   * This must be the _last_ route, just before errorMiddleware.
   */
  app.get('/{*path}', (_req, res) =>
    res.sendFile(`${reactStaticDir}/index.html`),
  );

  app.use(errorMiddleware);

  return app;
}
