import { Hono } from 'hono'

const app = new Hono()

app.post('/ping', (c) => {
  return c.text('pong')
})

export default app
