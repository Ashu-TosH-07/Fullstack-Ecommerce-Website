import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common-/form";
import { loginForm } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  // userName: "",
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Logged in Successfully");
      } else {
        toast.error(data?.payload?.message || "Some error occurred");
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login to your account
        </h1>
      </div>
      <CommonForm
        formControl={loginForm}
        submitText={"Log in"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="flex justify-center">
        <p className="text-center text-sm">
          Don't have an account
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
