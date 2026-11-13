import { setGenkitRuntimeConfig } from 'genkit';

// workerd forbids eval() and new Function(), which Genkit's schema validator
// and dotprompt rely on, and it cannot host the reflection server the Dev UI
// uses. Detected at runtime so both entry points can load this file.
const isWorkersRuntime = 'WebSocketPair' in globalThis;

setGenkitRuntimeConfig({
	jsonSchemaMode: 'interpret',
	sandboxedRuntime: isWorkersRuntime,
});
