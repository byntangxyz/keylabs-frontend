'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phoneNumber: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type SignUpFormValues = z.infer<typeof userSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        }),
      });

      if (response.ok) {
        router.push('/auth/signin?registered=true');
      } else {
        const result = await response.json();
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-gray-200 dark:border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="after:content-['*'] after:-ml-2 after:text-red-500"
              >
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                {...register('name')}
                className={
                  errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''
                }
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="after:content-['*'] after:-ml-2 after:text-red-500"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className={
                  errors.email
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : ''
                }
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
              <Input id="phoneNumber" type="tel" {...register('phoneNumber')} />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="after:content-['*'] after:-ml-2 after:text-red-500"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={
                  errors.password
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : ''
                }
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="after:content-['*'] after:-ml-2 after:text-red-500"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={
                  errors.confirmPassword
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : ''
                }
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
