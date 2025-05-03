import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonForm from "@/components/common-/form";
import { registerForm } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Registration Successful");
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message || "An error occurred");
      }     
    });
  };  

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
      </div>
      <CommonForm
        formControl={registerForm}
        submitText={"Register"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="flex justify-center">
        <p className="text-center text-sm">
          Already have an account
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline ml-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;
