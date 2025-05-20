import CardWrapper from "./CardWrapper"

export const TwoFASetup = () => {
  return(
    <div className="flex justify-center items-center h-full">
      <CardWrapper
        label="Have an account? Sign in"
        Opplink="/login"
      >
        <h1> Turn Two Factor Authentication</h1>
        <p>Scan the authenticator Application</p>
        <div className="">

        </div>
      </CardWrapper>
    </div>
    
  )
}