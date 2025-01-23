'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function VerifyNotice() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a verification link to your email. Please check your inbox and click on the
            link to verify your email address.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/login">
            <Button className="w-full" variant="default">
              Go to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <footer className="text-center mt-8 text-gray-500 text-sm">
        Didn&apos;t receive the email? Check your spam folder.
      </footer>
    </div>
  );
}