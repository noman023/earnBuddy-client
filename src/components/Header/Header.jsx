import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { CiBadgeDollar } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import userImg from "../../assets/user.png";
import useAuth from "../../hooks/useAuth";
import SpinnerComponent from "../Spinner/Spinner";

export default function Header() {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "LogOut successfully",
        });

        // navigate to home after logout
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.message,
        });
      });
  };

  return (
    <Navbar fluid rounded style={{ backgroundColor: "whitesmoke" }}>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-2xl font-semibold ">
          E<span className="text-blue-500">a</span>rnB
          <span className="text-blue-500">u</span>ddy
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            loading ? (
              <SpinnerComponent />
            ) : (
              <Avatar
                alt="User image"
                img={user?.photoURL ? `${user.photoURL}` : userImg}
                rounded
              />
            )
          }
        >
          {user ? (
            <>
              <Dropdown.Header>
                <span className="block text-sm">{user?.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>

              <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
            </>
          ) : (
            <Link to={"/login"}>
              <Dropdown.Item>Sign In</Dropdown.Item>
            </Link>
          )}
        </Dropdown>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>

        {user ? (
          <>
            <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>

            <div
              title="Your Available Coins"
              className="bg-blue-500 px-3 py-1 rounded flex gap-1 font-bold text-white"
            >
              <CiBadgeDollar className="text-xl" />
              <p>100</p>
            </div>
          </>
        ) : (
          <>
            <Navbar.Link
              title="taking you to a random video"
              href="https://www.youtube.com/watch?v=BHACKCNDMW8"
              target="_blank"
            >
              Watch Demo
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
