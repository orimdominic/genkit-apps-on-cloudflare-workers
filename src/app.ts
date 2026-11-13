import { Hono } from 'hono';
import { validator } from 'hono/validator';

import { explainerFlow, explainerInputSchema } from './flows/explainer';

const app = new Hono();

app.post('/ping', (c) => {
	return c.text('pong');
});

const validateTopic = validator('json', (value, c) => {
	const parsed = explainerInputSchema.safeParse(value);
	if (!parsed.success) {
		return c.json({ error: 'Send a JSON body like {"topic": "microservices"}' }, 400);
	}
	return parsed.data;
});

app.post('/explain', validateTopic, async (c) => {
	const { topic } = c.req.valid('json');
	const { explanation } = await explainerFlow({ topic });
	return c.json({ explanation });
});

export default app;
