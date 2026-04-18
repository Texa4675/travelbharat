'use server';
/**
 * @fileOverview A simple Genkit flow to explain concepts briefly.
 */

import {ai} from '@/ai/genkit';

export async function quickExplain(prompt: string = "Explain how AI works in a few words"): Promise<string> {
  const { text } = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    prompt: prompt,
  });
  return text;
}
