"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/CardWrapper";
import {useState, useTransition} from "react";
import { register } from "@/services/authApi";
import {useRouter} from "next/navigation";
import { FormSuccess, FormError } from "@/components/FormMessage";
import axios from "axios";

const RegisterSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be a string" })
    .email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  firstName: z.string().min(1, {message: "first name is required"}),
  lastName:z.string().min(1, {message: "last name name is required"})
});

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
 

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { firstName: "",  lastName: "", email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async() => {
      try {
        
        // const {data} = await register(values)
        const {data} = await axios.post("http://localhost:7000/api/auth/register", values)
        setSuccess(data.message);
       router.push('http://localhost:3000/login')
        console.log(data)
      } catch (error: any) {
        setError("Something went wrong during registration")
        console.log("The error is :", error.message)
      }
    })
  };

  return (
    <div className="flex justify-center items-center h-full">
      <CardWrapper
        label="Have an account? Sign in"
        Opplink="/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className=" flex flex-col gap-y-5">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 text-center"> Register Form</h1>
              <FormField
              control={form.control}
              name="firstName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your Last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
               <Button disabled={isPending} type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
