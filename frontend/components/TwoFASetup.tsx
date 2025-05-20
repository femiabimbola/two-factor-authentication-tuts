"use client"

import Image from "next/image"
import CardWrapper from "./CardWrapper"
import { Input } from "./ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button";

export const TwoFASetup = () => {

  const LoginSchema = z.object({

    input:z.string({ invalid_type_error: "Must be a string" }),
    QR:z.string({ invalid_type_error: "Must be a string" })
  });

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: { input: "",  QR: ""},
    });


const onSubmit = (values: z.infer<typeof LoginSchema>) => {}

  return(
    <div className="flex justify-center items-center h-full">
      <CardWrapper
       
        Opplink="/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className=" flex flex-col gap-y-5">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center"> Activate Two Factor Authentication</h1>
              <FormField
                  control={form.control}
                  name="QR"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Scan the authenticator Application</FormLabel>
                      <FormControl>
              
                      </FormControl>
                    </FormItem>
                  )}
                />
              <FormField
                  control={form.control}
                  name="input"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Or Input the QR code manually</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the QR code"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
               <Button type="submit" className="cursor-pointer"> Continue to Verification</Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
    
  )
}