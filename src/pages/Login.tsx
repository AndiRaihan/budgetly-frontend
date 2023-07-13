import  LoginForm from "../components/LoginForm";
import LayeredWaves from "../assets/layered-waves-haikei-tengah 1.svg";

const Login = () => {
  return (
    <div className="bg-background-light-100 h-screen grid grid-cols-2">
    <img
      src={LayeredWaves}
      alt="Layered Wave"
      className="w-screen object-scale-down"
    />
  <div className="flex justify-center">
    <LoginForm />
  </div>
</div>
  )
}

export default Login