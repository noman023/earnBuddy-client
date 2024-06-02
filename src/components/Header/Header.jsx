import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";

import userImg from "../../assets/user.png";

export default function Header() {
  const user = true;

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
          label={<Avatar alt="User settings" img={userImg} rounded />}
        >
          {user ? (
            <>
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>

              <Dropdown.Item>Sign out</Dropdown.Item>
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
