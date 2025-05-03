import { Outlet } from "react-router-dom";
import img from "../../assets/X-plore -new.png";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-[#2F2953] w-1/2 px-12">
        <img src={img} alt="" height="full" width="full" />
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
