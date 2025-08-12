'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import 'dotenv/config';

export const ai = genkit({
  plugins: [
    googleAI({
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
  model: 'googleai/gemini-2.0-flash',
});
