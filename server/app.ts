import { Hono } from 'hono';
import {
  createRequestHandler,
  unstable_RouterContextProvider,
} from 'react-router';

import * as build from 'virtual:react-router/server-build';

const app = new Hono();

const handler = createRequestHandler(build);
app.mount('/', (req) => handler(req, new unstable_RouterContextProvider()));

export default app.fetch;
