"use client";

import Image from "next/image";
import CardWrapper from "./CardWrapper";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";

export const TwoFASetup = ({onSetupComplete}: any) => {

  const TwoFASchema = z.object({
    input: z.string({ invalid_type_error: "Must be a string" }),
    QR: z.string({ invalid_type_error: "Must be a string" }),
  });

  const form = useForm<z.infer<typeof TwoFASchema>>({
    resolver: zodResolver(TwoFASchema),
    defaultValues: { input: "", QR: "" },
  });

  const onSubmit = (values: z.infer<typeof TwoFASchema>) => {
    onSetupComplete()
  };

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState({})

  const fetchQRcode = async () => {
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`)
  }

  const copyClickBoard = async() => {
    await navigator.clipboard.writeText(message) //To findout what this function does
    setMessage("Secret copied to clipboard")
    console.log(message)

  }

  //The Input field has to have his own function which {copyClickBoard}
  // submit button is {onSetupComplete}

  return (
    <div className="flex justify-center items-center h-full">
      <CardWrapper Opplink="/login">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className=" flex flex-col gap-y-5">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
                Activate Two Factor Authentication
              </h1>
              <FormField
                control={form.control}
                name="QR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scan the authenti cator Application</FormLabel>
                    <FormControl>{/* <Image /> */}</FormControl>
                  </FormItem>
                )}
              />
              {message && <p>{message}</p>}
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Or Input the QR code manually</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the QR code"
                        type="text"
                        onClick={copyClickBoard}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="cursor-pointer">
                Continue to Verification
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
