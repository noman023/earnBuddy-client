import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const axiosInstace = useAxiosInstance();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // add coins based on role
    const coins = data.role === "worker" ? 10 : 50;

    // host image to imgbb
    const imageFile = { image: data.photo[0] };
    const response = await axiosInstace.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imgUrl = response.data.data.display_url;

    if (response.data.success) {
      createUser(data.email, data.password)
        .then(() => {
          // update profile
          updateUserProfile(data.name, imgUrl)
            .then(() => {
              const userInfo = {
                email: data.email,
                role: data.role,
                coins,
              };

              // create user in db
              axiosInstace.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  reset(); // reset form

                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registered successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  // navigate to home after register
                  navigate("/");
                }
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "warning",
                title: err.message,
              });
            });
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            title: err.message,
          });
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>EarnBuddy || Register</title>
      </Helmet>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-4 border-2 border-blue-500 mx-auto my-10 p-5 rounded-xl shadow-2xl"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name1" value="Name" />
          </div>

          <TextInput
            {...register("name")}
            id="name1"
            type="text"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>

          <TextInput
            {...register("email")}
            id="email1"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="role" value="Why you're here for?" />
          </div>
          <Select id="role" {...register("role")} required>
            <option value={"worker"}>I'm a Job Seeker</option>
            <option value={"taskCreator"}>I'm an Employee Seeker </option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Profile Image" />
          </div>
          <FileInput id="file-upload" {...register("photo")} />
        </div>

        {/* password field */}
        <div>
          <div className="relative">
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>

            <TextInput
              {...register("password", {
                minLength: 6, //passowrd should be 6 character long
                // passowrd should have 1 uppercase, lowercase and special character and 1 number
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              id="password1"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              required
            />

            {/* eye icons */}
            {showPassword ? (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 text-xl cursor-pointer text-gray-500"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 text-xl cursor-pointer text-gray-500"
              />
            )}
          </div>

          {/* show error message while typing if requirements not met */}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">Password must be 6 characters long</p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              Password must have 1 Uppercase, 1 lower case, 1 number and 1
              special character.
            </p>
          )}
        </div>

        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Login
          </Link>
        </p>

        <Button type="submit" className="bg-blue-500 hover:bg-blue-400">
          Register
        </Button>
      </form>
    </div>
  );
}
