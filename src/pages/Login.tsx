import { useState } from "react";
import LoginForm from "../components/login-components/LoginForm";
import SingUpForm from "../components/login-components/SignUpForm";
import ChangePassword from "../components/login-components/ChangePassword";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isChnagingPassword, setIsChnagingPassword] = useState<boolean>(false);
  return (
    <div>
      {!isChnagingPassword &&
        (isLoggingIn ? (
          <LoginForm
            setIsLoggingIn={setIsLoggingIn}
            setIsChnagingPassword={setIsChnagingPassword}
          />
        ) : (
          <SingUpForm
            setIsLoggingIn={setIsLoggingIn}
            setIsChnagingPassword={setIsChnagingPassword}
          />
        ))}

      {isChnagingPassword && (
        <ChangePassword
          setIsLoggingIn={setIsLoggingIn}
          setIsChnagingPassword={setIsChnagingPassword}
        />
      )}
    </div>
  );
}

export default Login;
