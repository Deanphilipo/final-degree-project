'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing console issues
 * from uploaded photos and user notes.
 *
 * - summarizeIssue - A function that summarizes the issue with the console.
 * - SummarizeIssueInput - The input type for the summarizeIssue function.
 * - SummarizeIssueOutput - The return type for the summarizeIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueInputSchema = z.object({
  photoDataUris: z
    .array(z.string())
    .describe(
      "An array of photos of the console, as data URIs that must include a MIME type and use Base64 encoding. Expected format: ['data:<mimetype>;base64,<encoded_data>', ...]"
    ),
  userNotes: z
    .string()
    .describe('User-provided notes about the console issue.'),
});
export type SummarizeIssueInput = z.infer<typeof SummarizeIssueInputSchema>;

const SummarizeIssueOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the console issue.'),
});
export type SummarizeIssueOutput = z.infer<typeof SummarizeIssueOutputSchema>;

export async function summarizeIssue(
  input: SummarizeIssueInput
): Promise<SummarizeIssueOutput> {
  return summarizeIssueFlow(input);
}

const summarizeIssueFlow = ai.defineFlow(
  {
    name: 'summarizeIssueFlow',
    inputSchema: SummarizeIssueInputSchema,
    outputSchema: SummarizeIssueOutputSchema,
  },
  async (input) => {
    const {photoDataUris, userNotes} = input;

    const {output} = await ai.generate({
      prompt: `Based on the following user notes and images, provide a one-sentence summary of the issue with this game console.
      
      User Notes:
      ${userNotes}
      `,
      media: photoDataUris.map(uri => ({url: uri})),
      output: {
        schema: SummarizeIssueOutputSchema,
      }
    });

    return output!;
  }
);
