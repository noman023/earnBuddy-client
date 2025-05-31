import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { CiBadgeDollar } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import userImg from "../../assets/user.png";
import useAuth from "../../hooks/useAuth";
import SpinnerComponent from "../Spinner/Spinner";
import useUserRole from "../../hooks/useUserRole";
import useUserCoins from "../../hooks/useUserCoins";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Power } from "lucide-react";

export default function Header() {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const { userRole, isPending } = useUserRole();
  const { userCoins, isCoinsPending } = useUserCoins();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
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

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <ChevronDown className="w-[22px] h-[22px] text-gray-200" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white absolute -right-7 bottom-6 mb-2">
            <DropdownMenuLabel className="text-center">
              My Account
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                to="/profile"
                className="block w-full text-center text-[16px]"
              >
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="p-0 hover:bg-transparent mt-2">
              <button
                // onClick={handleLogout}
                className="flex w-full items-center justify-center gap-x-2 border border-gray-200 p-2 rounded-md bg-red-400 text-white"
              >
                <span>
                  <Power />
                </span>
                LogOut
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>

        {/* dashboard link based on userRole */}
        {isPending ? (
          <SpinnerComponent />
        ) : (
          <>
            {user && userRole === "worker" && (
              <Navbar.Link href="/dashboard/workerHome">Dashboard</Navbar.Link>
            )}

            {user && userRole === "taskCreator" && (
              <Navbar.Link href="/dashboard/taskCreatorHome">
                Dashboard
              </Navbar.Link>
            )}
            {user && userRole === "admin" && (
              <Navbar.Link href="/dashboard/adminHome">Dashboard</Navbar.Link>
            )}
          </>
        )}

        {user ? (
          <>
            <div
              title="Your Available Coins"
              className="bg-blue-500 px-3 py-1 rounded flex gap-1 font-bold text-white"
            >
              <CiBadgeDollar className="text-xl" />
              <p>{!isCoinsPending ? userCoins.coins : 0}</p>
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
