import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 h-screen">
        <p className="text-2xl text-black font-bold">Page not found! :(</p>

        <Link to={"/"}>
          <Button color={"success"}>Back to Home</Button>
        </Link>
      </div>
    </>
  );
}
