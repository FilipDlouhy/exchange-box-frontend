import { useState } from "react";
import LoginForm from "../components/login-components/LoginForm";
import SingUpForm from "../components/login-components/SignUpForm";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  return (
    <div>
      {isLoggingIn ? (
        <LoginForm setIsLoggingIn={setIsLoggingIn} />
      ) : (
        <SingUpForm setIsLoggingIn={setIsLoggingIn} />
      )}
    </div>
  );
}

export default Login;
