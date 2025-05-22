"use client"

import { TwoFASetup } from "@/components/TwoFASetup";
import { useRouter } from "next/navigation";

const Setup2Fa = () => {
  const router = useRouter();

  const handleOnSetupComplete = () => {
    router.push("/verify2fa");
  };

  return <TwoFASetup onSetupComplete={handleOnSetupComplete} />;
};

export default Setup2Fa;
