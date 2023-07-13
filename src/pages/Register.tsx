import RegisterForm from "../components/RegisterForm";
import LayeredWaves3 from "../assets/layered-waves-var-3.svg";

export default function Register() {
  return (
    <div className="bg-background-light-100 h-screen grid grid-cols-2">
        <img
          src={LayeredWaves3}
          alt="Layered Wave"
          className="w-screen object-scale-down"
        />
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
