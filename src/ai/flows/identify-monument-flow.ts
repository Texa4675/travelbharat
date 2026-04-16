'use server';
/**
 * @fileOverview An AI agent that identifies Indian monuments and landmarks from photos.
 *
 * - identifyMonument - A function that identifies a monument from a photo and provides details.
 * - IdentifyMonumentInput - The input type for the identifyMonument function.
 * - IdentifyMonumentOutput - The return type for the identifyMonument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyMonumentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a monument or landmark, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyMonumentInput = z.infer<typeof IdentifyMonumentInputSchema>;

const IdentifyMonumentOutputSchema = z.object({
  isIndianMonument: z.boolean().describe('Whether the photo contains a recognizable Indian monument or landmark.'),
  name: z.string().optional().describe('The name of the identified monument.'),
  location: z.object({
    state: z.string().optional(),
    city: z.string().optional(),
  }).optional(),
  description: z.string().optional().describe('A brief description of the place.'),
  history: z.string().optional().describe('Historical significance of the monument.'),
  funFacts: z.array(z.string()).optional().describe('Interesting or unique facts about the place.'),
  confidence: z.number().describe('Confidence level of the identification (0-1).'),
});
export type IdentifyMonumentOutput = z.infer<typeof IdentifyMonumentOutputSchema>;

export async function identifyMonument(input: IdentifyMonumentInput): Promise<IdentifyMonumentOutput> {
  return identifyMonumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyMonumentPrompt',
  input: {schema: IdentifyMonumentInputSchema},
  output: {schema: IdentifyMonumentOutputSchema},
  prompt: `You are an expert Indian Historian and Travel Guide specializing in visual identification of landmarks and heritage sites.

Analyze the provided photo. Your task is to:
1. Identify if the image contains a recognizable Indian monument, historical building, temple, or tourist landmark.
2. If identified, provide the name, location (State and City), a short description, and its historical significance.
3. Include 2-3 fun or unique facts that a traveler would find interesting.
4. If the image is not an Indian monument or landmark, set isIndianMonument to false.

Photo: {{media url=photoDataUri}}`,
});

const identifyMonumentFlow = ai.defineFlow(
  {
    name: 'identifyMonumentFlow',
    inputSchema: IdentifyMonumentInputSchema,
    outputSchema: IdentifyMonumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to identify the monument.');
    }
    return output;
  }
);
