import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import { FaHome, FaList, FaWallet } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <Header />

      <div className="md:flex ">
        <div className="md:w-1/4 bg-gray-200 rounded-md p-4 md:min-h-screen">
          <ul className="space-y-3 text-black font-bold">
            <li>
              <Link className="flex gap-2 items-center hover:text-blue-600">
                <FaHome /> Home
              </Link>
            </li>

            <li>
              <Link className="flex gap-2 items-center hover:text-blue-600">
                <FaList /> Task List
              </Link>
            </li>

            <li>
              <Link className="flex gap-2 items-center hover:text-blue-600">
                <FaList /> My Submission
              </Link>
            </li>

            <li>
              <Link className="flex gap-2 items-center hover:text-blue-600">
                <FaWallet /> Withdrawals
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:w-3/4 flex flex-col">
          <div className="flex-grow my-5 mx-2">
            <Outlet />
          </div>

          <FooterComponent />
        </div>
      </div>
    </div>
  );
}
