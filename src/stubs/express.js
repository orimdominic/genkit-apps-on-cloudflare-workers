// Genkit's reflection server imports express at module load, and its callers
// pull in body-parser -> raw-body -> iconv-lite, which calls require('stream')
// in a way workerd rejects. The Worker never starts the reflection server
// (sandboxedRuntime: true), so wrangler redirects 'express' to this stand-in.
// Node still gets the real express: src/dev.ts does not go through wrangler.
function express() {
	const app = () => app;
	app.use = () => app;
	app.get = () => app;
	app.post = () => app;
	app.put = () => app;
	app.delete = () => app;
	app.listen = () => app;
	app.set = () => app;
	app.engine = () => app;
	app.locals = {};
	return app;
}

// Mirrors the express APIs referenced by genkit's reflection server.
const passthrough = () => (_req, _res, next) => next?.();

express.json = passthrough;
express.urlencoded = passthrough;
express.raw = passthrough;
express.text = passthrough;
express.static = passthrough;
express.Router = express;

export default express;
