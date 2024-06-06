import { Button, Label, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosInstance from "../../hooks/useAxiosInstance";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, loginWithGoogle } = useAuth();
  const axiosInstace = useAxiosInstance();

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // navigate after login
  const navigateTo = () => {
    navigate(location?.state ? location.state : "/dashboard");
  };

  const onSubmit = (data) => {
    logIn(data.email, data.password)
      .then(() => {
        reset(); // reset form

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigateTo();
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        // google user's role will be worker and coins 10
        const userInfo = {
          email: res.user.email,
          role: "worker",
          coins: 10,
        };

        // create user in db
        axiosInstace.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset(); // reset form

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Logged in successfully",
              showConfirmButton: false,
              timer: 1500,
            });

            navigateTo();
          }
        });
      })
      .catch((err) =>
        Swal.fire({
          icon: "warning",
          title: err.message,
        })
      );
  };

  return (
    <div>
      <Helmet>
        <title>EarnBuddy || Login</title>
      </Helmet>

      <form
        className="flex max-w-md flex-col gap-4 border-2 border-blue-600 mx-auto my-10 p-5 rounded-xl shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>

          <TextInput
            {...register("email")}
            id="email1"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="relative">
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>

          <TextInput
            {...register("password")}
            id="password1"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            required
          />

          {showPassword ? (
            <FaEye
              className="absolute right-3 bottom-3 text-gray-500 text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-3 bottom-3 text-gray-500 text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">
            Resigter
          </Link>
        </p>

        <Button type="submit" className="bg-blue-500 hover:bg-blue-400">
          Login
        </Button>

        <p className="text-lg text-black font-bold text-center">Or</p>

        <Button
          onClick={handleGoogleLogin}
          type="button"
          gradientDuoTone="cyanToBlue"
        >
          Login with Google
          <FcGoogle className="text-lg ml-2" />
        </Button>
      </form>
    </div>
  );
}
