import LoginFormContainer from "../containers/login/LoginFormContainer";
//import MockLoginFormContainer from "@/containers/MockLoginFormContainer"; //giriş denemesi için mock user

export default function LoginPage() {
  return (
    <div>
      <LoginFormContainer /> {/*MockLoginFormContainer */}
    </div>
  );
}
