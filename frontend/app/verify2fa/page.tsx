import { TwoFAVerify } from "@/components/TwoFAVerify";
import { useRouter } from "next/navigation";

const Verify2Fa = () => {
  const router = useRouter();

  const handleOnVerifyComplete = () => {
    router.push("/verify2fa");
  };

  const handle2faReset = () => {
    
  }

  return (
    <div><TwoFAVerify onVerifySuccess={handleOnVerifyComplete} onResetSuccess={handle2faReset}/></div>
  )
}

export default Verify2Fa
