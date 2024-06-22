import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/main/Main";
import NotFound from "../pages/NotFound/NotFound";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/dashboard/Dashboard";
import PrivateRoute from "./secureRoutes/PrivateRoute";
import ForbiddenRoute from "./ForbiddenRoute";

// worker pages
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome";
import MySubmissions from "../pages/Dashboard/Worker/MySubmissions";
import TaskList from "../pages/Dashboard/Worker/TaskList";
import TaskDetails from "../pages/Dashboard/Worker/TaskDetails/TaskDetails";
import Withdrawals from "../pages/Dashboard/Worker/Withdrawals";

// task creator pages
import TaskCreatorHome from "../pages/Dashboard/TaskCreator/TaskCreatorHome/TaskCreatorHome";
import AddTask from "../pages/Dashboard/TaskCreator/AddTask";
import MyTasks from "../pages/Dashboard/TaskCreator/MyTasks/MyTasks";
import CoinPurchase from "../pages/Dashboard/TaskCreator/CoinPurchase";
import PaymentHistory from "../pages/Dashboard/TaskCreator/PaymentHistory";

// admin pages
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageTasks from "../pages/Dashboard/Admin/ManageTask/ManageTasks";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

// role based routes
import AdminRoute from "./secureRoutes/AdminRoute";
import TaskCreatorRoute from "./secureRoutes/TaskCreatorRoute";
import WorkerRoute from "./secureRoutes/WorkerRoute";

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
      {
        path: "/forbidden",
        element: <ForbiddenRoute />,
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
        element: (
          <WorkerRoute>
            <WorkerHome />
          </WorkerRoute>
        ),
      },
      {
        path: "taskList",
        element: (
          <WorkerRoute>
            <TaskList />
          </WorkerRoute>
        ),
      },
      {
        path: "taskDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:8000/tasks/${params.id}`),
        element: (
          <WorkerRoute>
            <TaskDetails />
          </WorkerRoute>
        ),
      },
      {
        path: "submission",
        element: (
          <WorkerRoute>
            <MySubmissions />
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            <Withdrawals />,
          </WorkerRoute>
        ),
      },
      // Task Creator's routes
      {
        path: "taskCreatorHome",
        element: (
          <TaskCreatorRoute>
            <TaskCreatorHome />
          </TaskCreatorRoute>
        ),
      },
      {
        path: "addTask",
        element: (
          <TaskCreatorRoute>
            <AddTask />
          </TaskCreatorRoute>
        ),
      },
      {
        path: "myTasks",
        element: (
          <TaskCreatorRoute>
            <MyTasks />
          </TaskCreatorRoute>
        ),
      },
      {
        path: "coinPurchase",
        element: (
          <TaskCreatorRoute>
            <CoinPurchase />
          </TaskCreatorRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <TaskCreatorRoute>
            <PaymentHistory />
          </TaskCreatorRoute>
        ),
      },
      // Admin's routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manageTask",
        element: (
          <AdminRoute>
            <ManageTasks />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default routes;
