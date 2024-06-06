import { Link, Outlet } from "react-router-dom";
import { FaHome, FaList, FaWallet } from "react-icons/fa";

import Header from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

export default function Dashboard() {
  const workerList = (
    <>
      <li>
        <Link
          to={"workerHome"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaHome /> Home
        </Link>
      </li>

      <li>
        <Link
          to={"taskList"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaList /> Task List
        </Link>
      </li>

      <li>
        <Link
          to={"submission"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaList /> My Submission
        </Link>
      </li>

      <li>
        <Link
          to={"withdrawals"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaWallet /> Withdrawals
        </Link>
      </li>
    </>
  );

  const taskCreatorList = (
    <>
      <li>
        <Link
          to={"taskCreatorHome"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaHome /> Home
        </Link>
      </li>

      <li>
        <Link
          to={"addTask"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaList /> Add a New Task
        </Link>
      </li>

      <li>
        <Link
          to={"myTasks"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaList /> My Tasks
        </Link>
      </li>

      <li>
        <Link
          to={"coinPurchase"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaWallet /> Purchase Coin
        </Link>
      </li>
      <li>
        <Link
          to={"payments"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaWallet /> Payments History
        </Link>
      </li>
    </>
  );

  const adminList = (
    <>
      <li>
        <Link
          to={"adminHome"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaHome /> Home
        </Link>
      </li>

      <li>
        <Link
          to={"manageTask"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaList /> Manage Tasks
        </Link>
      </li>

      <li>
        <Link
          to={"manageUsers"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaList /> Manage Users
        </Link>
      </li>
    </>
  );

  return (
    <div className="container mx-auto">
      <Header />

      <div className="md:flex ">
        <div className="md:w-1/4 bg-blue-500 rounded-md p-4 md:min-h-screen">
          <ul className="space-y-3 text-white">{workerList}</ul>
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
