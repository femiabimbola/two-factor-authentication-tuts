import { useRouter } from "next/navigation";

const Verify2Fa = () => {
  const router = useRouter();

  const handleOnSetupComplete = () => {
    router.push("/verify2fa");
  };

  return (
    <div>Verfiy 2fa</div>
  )
}

export default Verify2Fa
