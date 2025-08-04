'use client';

import { useState, useTransition, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

function AuthFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        if (mode === 'signup') {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = userCredential.user;
          // Create user profile in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            role: 'user', // Default role
          });
          toast({
            title: 'Account Created',
            description: 'Please sign in to continue.',
          });
          router.push('/auth');
        } else {
          await signInWithEmailAndPassword(auth, values.email, values.password);
          toast({
            title: 'Signed In',
            description: 'Welcome back!',
          });
          router.push('/dashboard');
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Authentication Error',
          description: error.message || 'An unexpected error occurred.',
        });
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'signup' ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        {mode === 'signin' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/auth?mode=signup" className="underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/auth" className="underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default function AuthForm() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthFormComponent />
        </Suspense>
    )
}
