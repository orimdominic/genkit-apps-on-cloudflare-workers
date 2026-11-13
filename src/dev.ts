import './genkit-runtime';

import { serve } from '@hono/node-server';

import app from './app';

serve({ fetch: app.fetch, port: 3781 }, (info) => {
	console.log(`Hono server listening on http://localhost:${info.port}`);
});
