import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/main/Main";
import NotFound from "../pages/NotFound/NotFound";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/dashboard/Dashboard";
import PrivateRoute from "./secureRoutes/PrivateRoute";

// worker pages
import WorkerHome from "../pages/Dashboard/Worker/Home";
import TaskList from "../pages/Dashboard/Worker/TaskList";
import Submissions from "../pages/Dashboard/Worker/Submissions";
import Withdrawals from "../pages/Dashboard/Worker/Withdrawals";

// task creator pages
import TaskCreatorHome from "../pages/Dashboard/TaskCreator/TaskCreatorHome";
import AddTask from "../pages/Dashboard/TaskCreator/AddTask";
import MyTasks from "../pages/Dashboard/TaskCreator/MyTasks/MyTasks";
import CoinPurchase from "../pages/Dashboard/TaskCreator/CoinPurchase";
import PaymentHistory from "../pages/Dashboard/TaskCreator/PaymentHistory";

// admin pages
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageTasks from "../pages/Dashboard/Admin/ManageTasks";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // worker's routes
      {
        path: "workerHome",
        element: <WorkerHome />,
      },
      {
        path: "taskList",
        element: <TaskList />,
      },
      {
        path: "submission",
        element: <Submissions />,
      },
      {
        path: "withdrawals",
        element: <Withdrawals />,
      },
      // Task Creator's routes
      {
        path: "taskCreatorHome",
        element: <TaskCreatorHome />,
      },
      {
        path: "addTask",
        element: <AddTask />,
      },
      {
        path: "myTasks",
        element: <MyTasks />,
      },
      {
        path: "coinPurchase",
        element: <CoinPurchase />,
      },
      {
        path: "payments",
        element: <PaymentHistory />,
      },
      // Admin's routes
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "manageTask",
        element: <ManageTasks />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
    ],
  },
]);

export default routes;
