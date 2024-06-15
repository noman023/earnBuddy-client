import { Link, Outlet } from "react-router-dom";

import { FaHome, FaTasks, FaHistory } from "react-icons/fa";
import { MdAddTask, MdManageAccounts } from "react-icons/md";
import { ImCoinDollar } from "react-icons/im";
import { GrTasks } from "react-icons/gr";
import { BiMoneyWithdraw } from "react-icons/bi";

import Header from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import useUserRole from "../../hooks/useUserRole";
import SpinnerComponent from "../../components/Spinner/Spinner";

export default function Dashboard() {
  const { userRole, isPending } = useUserRole();

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
          <FaTasks /> Task List
        </Link>
      </li>

      <li>
        <Link
          to={"submission"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <GrTasks /> My Submission
        </Link>
      </li>

      <li>
        <Link
          to={"withdrawals"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <BiMoneyWithdraw /> Withdrawals
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
          <MdAddTask /> Add a New Task
        </Link>
      </li>

      <li>
        <Link
          to={"myTasks"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaTasks /> My Tasks
        </Link>
      </li>

      <li>
        <Link
          to={"coinPurchase"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <ImCoinDollar /> Purchase Coin
        </Link>
      </li>
      <li>
        <Link
          to={"payments"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <FaHistory /> Payments History
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
          <FaTasks /> Manage Tasks
        </Link>
      </li>

      <li>
        <Link
          to={"manageUsers"}
          className="flex gap-2 items-center hover:text-gray-300"
        >
          <MdManageAccounts /> Manage Users
        </Link>
      </li>
    </>
  );

  return (
    <div className="container mx-auto">
      <Header />

      <div className="md:flex ">
        <div className="md:w-1/4 bg-blue-500 rounded-md p-4 md:min-h-screen">
          <ul className="space-y-3 text-white">
            {isPending ? (
              <SpinnerComponent />
            ) : (
              <>
                {userRole === "worker" && workerList}
                {userRole === "taskCreator" && taskCreatorList}
                {userRole === "admin" && adminList}
              </>
            )}
          </ul>
        </div>

        <div className="md:w-3/4 flex flex-col">
          <div className="flex-grow mx-2">
            <Outlet />
          </div>

          <FooterComponent />
        </div>
      </div>
    </div>
  );
}
