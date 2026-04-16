'use server';
/**
 * @fileOverview An AI-powered tool for administrators to generate detailed descriptions,
 * historical significance, and unique insights for tourist destinations.
 *
 * - generateDestinationDetails - A function that generates destination details using AI.
 * - GenerateDestinationDetailsInput - The input type for the generateDestinationDetails function.
 * - GenerateDestinationDetailsOutput - The return type for the generateDestinationDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDestinationDetailsInputSchema = z.object({
  placeName: z.string().describe('The name of the tourist place.'),
  state: z.string().describe('The state where the tourist place is located.'),
  city: z.string().optional().describe('The city where the tourist place is located.'),
  category: z
    .string()
    .optional()
    .describe('The category of the tourist place (e.g., Heritage, Nature, Adventure, Religious).'),
  currentDescription: z
    .string()
    .optional()
    .describe('An optional existing description to augment or refine.'),
});
export type GenerateDestinationDetailsInput = z.infer<typeof GenerateDestinationDetailsInputSchema>;

const GenerateDestinationDetailsOutputSchema = z.object({
  detailedDescription: z.string().describe('A comprehensive description of the tourist place.'),
  historicalSignificance: z.string().describe('The historical context and importance of the place.'),
  uniqueInsights: z.array(z.string()).describe('A list of unique insights, facts, or interesting aspects about the destination.'),
});
export type GenerateDestinationDetailsOutput = z.infer<typeof GenerateDestinationDetailsOutputSchema>;

export async function generateDestinationDetails(
  input: GenerateDestinationDetailsInput
): Promise<GenerateDestinationDetailsOutput> {
  return adminAIDescriptionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminAIDescriptionPrompt',
  input: {schema: GenerateDestinationDetailsInputSchema},
  output: {schema: GenerateDestinationDetailsOutputSchema},
  prompt: `You are an expert travel writer and historian for "TravelBharat", a platform showcasing Indian tourist destinations.
Your task is to generate rich, engaging, and accurate content for a tourist place based on the provided details.
Focus on providing a detailed description, historical significance, and unique insights.
If an existing description is provided, use it as a starting point to augment or refine the content.
Be informative and captivating, especially for potentially lesser-known spots, highlighting what makes them special.

Destination Name: {{{placeName}}}
State: {{{state}}}
{{#if city}}City: {{{city}}}{{/if}}
{{#if category}}Category: {{{category}}}{{/if}}
{{#if currentDescription}}Existing Description (augment/refine):
"""
{{{currentDescription}}}
"""
{{/if}}

Please provide the following:
1. detailedDescription: A comprehensive and engaging description.
2. historicalSignificance: The historical background and cultural importance.
3. uniqueInsights: A list of interesting facts or unique aspects that make this place stand out.`,
});

const adminAIDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'adminAIDescriptionGeneratorFlow',
    inputSchema: GenerateDestinationDetailsInputSchema,
    outputSchema: GenerateDestinationDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate destination details.');
    }
    return output;
  }
);
