"use client";

import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";


const schema = z.object({
  identifier: z.string().min(1, { message: "Username or email is required" }).transform((value) => value.trim()),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).transform((value) => value.trim()),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: ''.toLowerCase(),
      password: "",


    },
  });

  const handleLogin = async (values: z.infer<typeof schema>) => {
    const res = await signIn("credentials", {
      identifier: values.identifier.toLowerCase(),
      password: values.password,
      redirect: false,
    });
   
    if(res?.error){
      alert(res.error)
    }else{
      console.log('success')
      router.push('/')
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username or email" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription className='text-gray-500 text-sm'>Don&apos;t have an account? <Link href='/signup' className="font-bold text-blue-600">Sign up</Link></FormDescription>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}