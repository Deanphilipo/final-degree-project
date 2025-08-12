import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {firebase} from '@genkit-ai/firebase';
import 'dotenv/config';

export const ai = genkit({
  plugins: [
    firebase(),
    googleAI({
      projectId: process.env.GCLOUD_PROJECT,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
  model: 'googleai/gemini-2.0-flash',
});
