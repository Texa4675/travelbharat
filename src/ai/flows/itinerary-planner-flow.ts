'use server';
/**
 * @fileOverview An AI agent that generates personalized travel itineraries for Indian states.
 *
 * - generateItinerary - A function that generates a multi-day travel plan.
 * - ItineraryInput - The input type for the planner.
 * - ItineraryOutput - The structured response containing the day-by-day plan.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ItineraryInputSchema = z.object({
  state: z.string().describe('The Indian state to plan for.'),
  interests: z.array(z.string()).describe('User interests (e.g., Heritage, Nature, Adventure).'),
  durationDays: z.number().min(1).max(7).default(3).describe('Number of days for the trip.'),
});
export type ItineraryInput = z.infer<typeof ItineraryInputSchema>;

const ActivitySchema = z.object({
  time: z.string().describe('Suggested time of day (e.g., Morning, Afternoon, Evening).'),
  place: z.string().describe('Name of the place or monument.'),
  description: z.string().describe('Brief description of the activity.'),
  tip: z.string().optional().describe('A pro-tip for visiting this specific place.'),
});

const DayPlanSchema = z.object({
  day: z.number(),
  theme: z.string().describe('The main theme for the day (e.g., Historic Heartland, Coastal Charm).'),
  activities: z.array(ActivitySchema),
});

const ItineraryOutputSchema = z.object({
  title: z.string().describe('An evocative title for the trip.'),
  overview: z.string().describe('A brief summary of what the traveler will experience.'),
  days: z.array(DayPlanSchema),
  budgetCategory: z.enum(['Economy', 'Mid-range', 'Luxury']).describe('Estimated budget level.'),
  packingEssentials: z.array(z.string()).describe('3-5 essential items to pack for this specific state.'),
});
export type ItineraryOutput = z.infer<typeof ItineraryOutputSchema>;

export async function generateItinerary(input: ItineraryInput): Promise<ItineraryOutput> {
  return itineraryPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'itineraryPlannerPrompt',
  input: {schema: ItineraryInputSchema},
  output: {schema: ItineraryOutputSchema},
  prompt: `You are an expert Indian Travel Planner for "TravelBharat". 
Your goal is to create a deeply immersive and culturally rich travel itinerary for the state of {{{state}}}.

The traveler is interested in: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
The trip duration is {{{durationDays}}} days.

Create a logical, day-by-day plan that minimizes travel time and maximizes experience. 
Include a mix of famous landmarks and hidden gems. 
Provide practical pro-tips (like best photography spots or local snacks to try).

State: {{{state}}}
Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Duration: {{{durationDays}}} Days`,
});

const itineraryPlannerFlow = ai.defineFlow(
  {
    name: 'itineraryPlannerFlow',
    inputSchema: ItineraryInputSchema,
    outputSchema: ItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate travel itinerary.');
    }
    return output;
  }
);
