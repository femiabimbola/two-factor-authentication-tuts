"use client"

import { TwoFAVerify } from "@/components/TwoFAVerify";
import { useRouter } from "next/navigation";

const Verify2Fa = () => {
  const router = useRouter();

  const handleOnVerifyComplete = (data: any) => {
   if(data) router.push("/");
  };

  const handle2faReset = () => {

  }

  return (
    <div><TwoFAVerify onVerifySuccess={handleOnVerifyComplete} onResetSuccess={handle2faReset}/></div>
  )
}

export default Verify2Fa
