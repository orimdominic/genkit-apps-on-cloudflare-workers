import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

const buildSystemPrompt = (topic: string) =>
	`You are an excellent teacher of software engineering concepts. Explain ${topic} to me like I'm a junior software engineer using analogies that I can relate to and understand.`;

export const ai = genkit({
	plugins: [googleAI()],
	model: googleAI.model('gemini-3.5-flash'),
});

export const explainerInputSchema = z.object({ topic: z.string().min(1) });

export const explainerFlow = ai.defineFlow(
	{
		name: 'explainerFlow',
		inputSchema: explainerInputSchema,
		outputSchema: z.object({ explanation: z.string() }),
	},
	async ({ topic }) => {
		// system and prompt are passed as message parts, not strings, so
		// dotprompt never compiles them with Function() (blocked on Workers).
		const { text } = await ai.generate({
			system: [{ text: buildSystemPrompt(topic) }],
			prompt: [{ text: `Topic: ${topic}` }],
		});

		return { explanation: text };
	},
);
