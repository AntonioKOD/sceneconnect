'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// The main VerifyEmail component with a Suspense wrapper
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}

// The actual email verification logic
function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Verifying your email...');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (token) {
      fetch(`/api/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
            setStatus('error');
          } else {
            setMessage('Email verified successfully! You can now log in.');
            setStatus('success');
            setTimeout(() => router.push('/login'), 2000);
          }
        })
        .catch(() => {
          setMessage('An error occurred. Please try again.');
          setStatus('error');
        });
    } else {
      setMessage('Invalid or missing token.');
      setStatus('error');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1
          className={`text-2xl font-bold mb-4 ${
            status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-gray-800'
          }`}
        >
          {status === 'loading' ? 'Verifying...' : status === 'success' ? 'Success!' : 'Error'}
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>

        {status === 'success' ? (
          <Link
            href="/login"
            className="inline-block bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Go to Login
          </Link>
        ) : (
          status === 'error' && (
            <Link
              href="/signup"
              className="inline-block bg-red-500 text-white text-center py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Sign Up Again
            </Link>
          )
        )}
      </div>
    </div>
  );
}