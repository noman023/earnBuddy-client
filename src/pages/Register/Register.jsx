import { Button, Label, Select, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register submitted");
  };

  return (
    <div>
      <Helmet>
        <title>EarnBuddy || Register</title>
      </Helmet>

      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 border-2 border-blue-500 mx-auto my-10 p-5 rounded-xl shadow-2xl"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name1" value="Name" />
          </div>

          <TextInput
            id="name1"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>

          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Why you're here for?" />
          </div>
          <Select id="countries" required>
            <option>---</option>
            <option value={"worker"}>I'm a Job Seeker</option>
            <option value={"taskCreator"}>I'm an Employee Seeker </option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="photoUrl1" value="Photo Url" />
          </div>

          <TextInput
            id="photoUrl1"
            type="text"
            name="photoUrl"
            placeholder="photo url"
            required
          />
        </div>

        <div className="relative">
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>

          <TextInput
            id="password1"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            required
          />

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
