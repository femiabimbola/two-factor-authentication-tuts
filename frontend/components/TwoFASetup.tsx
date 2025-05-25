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
import { useEffect, useState } from "react";
import axios from "axios";

export const TwoFASetup = ({ onSetupComplete }: any) => {

  const TwoFASchema = z.object({
    input: z.string({ invalid_type_error: "Must be a string" }),
  });

  const form = useForm<z.infer<typeof TwoFASchema>>({
    resolver: zodResolver(TwoFASchema),
    defaultValues: { input: "", },
  });

  const onSubmit = (values: z.infer<typeof TwoFASchema>) => {
    onSetupComplete();
  };

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const fetchQRcode = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/2fa/setup`,
      { withCredentials: true }
    );
    // console.log(data.data);
    setResponse(data.data);
  };

  useEffect(() => {
    fetchQRcode();
  }, []); //It only runs once

  const copyClickBoard = async () => {
    // await navigator.clipboard.writeText(response.secret) //To findout what this function does
    setMessage("Secret copied to clipboard");
    console.log(message);
  };

  //The Input field has to have his own function which {copyClickBoard}
  // submit button is {onSetupComplete}

  return (
    <div className="flex justify-center items-center h-full">
      <CardWrapper Opplink="/login">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className=" flex flex-col gap-y-5">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                Activate Two Factor Authentication
              </h1>
              <div className="mx-auto">
                {response && <h3> Scan with your authenticator application </h3>}
                {response && (
                  <Image
                    src={response}
                    alt="2FA QR Code"
                    width={240} height={240}
                    className="mx-auto"
                  />
                )}
              </div>
              {message && <p className="text-gray-900">{message}</p>}
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the QR code</FormLabel>
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
