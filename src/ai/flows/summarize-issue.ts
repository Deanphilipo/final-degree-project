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
      'An array of photos of the console, as data URIs that must include a MIME type and use Base64 encoding. Expected format: [\