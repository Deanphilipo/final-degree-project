'use server';

/**
 * @fileOverview This file defines a Genkit flow for uploading files to Firebase Storage.
 * This is a workaround to address issues with the client-side Firebase SDK.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getStorage} from 'firebase-admin/storage';
import {getApp, getApps, initializeApp} from 'firebase-admin/app';

// Initialize Firebase Admin SDK if not already initialized
const app = !getApps().length
  ? initializeApp()
  : getApp();

const bucket = getStorage(app).bucket();

const UploadFileInputSchema = z.object({
  fileDataUri: z.string().describe('The file encoded as a data URI.'),
  filePath: z.string().describe('The full path where the file should be stored in Firebase Storage.'),
});
export type UploadFileInput = z.infer<typeof UploadFileInputSchema>;

const UploadFileOutputSchema = z.object({
  downloadUrl: z.string().describe('The public download URL of the uploaded file.'),
});
export type UploadFileOutput = z.infer<typeof UploadFileOutputSchema>;


export async function uploadFile(input: UploadFileInput): Promise<UploadFileOutput> {
  return uploadFileFlow(input);
}


const uploadFileFlow = ai.defineFlow(
  {
    name: 'uploadFileFlow',
    inputSchema: UploadFileInputSchema,
    outputSchema: UploadFileOutputSchema,
  },
  async ({fileDataUri, filePath}) => {
    const file = bucket.file(filePath);

    // Extract content type and base64 data from data URI
    const match = fileDataUri.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
      throw new Error('Invalid data URI format.');
    }
    const contentType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload the file
    await file.save(buffer, {
      metadata: {
        contentType: contentType,
      },
    });

    // Make the file public and get the URL
    await file.makePublic();

    return {
      downloadUrl: file.publicUrl(),
    };
  }
);
