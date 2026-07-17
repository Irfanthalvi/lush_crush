import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Login";
import Otp from "./Otp";
import Register from "./Register";
import Forget from "./forget";

const LoginPage = ({ activeForm = "login" }) => {
  const [active, setActive] = useState(activeForm);
  const navigate = useNavigate();

  const handleSetActive = (form) => {
    setActive(form);
    navigate(`/${form}`);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left Side: Image with same shade as right */}
      <div className="hidden md:block w-1/2 h-full relative">
        <img
          src="/images/right-image.jpg"
          alt="Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-1">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
            alt="Logo"
            className="h-12 mb-2 invert"
          />
          <p className="text-6xl font-bold text-white mb-4">Lush Crush</p>
          <p className="text-4xl font-bold text-white">ice-pop</p>
        </div>

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Right Side: Form with same shade overlay */}
      <div className="w-full md:w-1/2 h-full overflow-hidden relative">
        {/* Background Image behind the forms */}
        <img
          src="/images/right-image.jpg"
          alt="Right Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="w-full h-full relative z-10">
          {active === "login" && <LoginForm setActive={handleSetActive} />}
          {active === "register" && <Register setActive={handleSetActive} />}
          {active === "otp" && <Otp setActive={handleSetActive} />}
          {active === "forget" && <Forget setActive={handleSetActive} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
