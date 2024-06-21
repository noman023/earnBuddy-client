import { Helmet } from "react-helmet-async";
import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function TaskList() {
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const { data = [] } = useQuery({
    queryKey: ["taskList"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/tasks`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Employee || Task List</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((task) => (
          <Card className="text-gray-600" key={task._id}>
            <h5 className="text-xl font-bold tracking-tight text-gray-900">
              {task.title}
            </h5>

            <div className="">
              <p className="font-normal ">
                Employeer: <span className="font-bold">{task.creatorName}</span>
              </p>

              <p className="font-normal ">
                Deadline:{" "}
                <span className="font-bold">{task.lastDate.split("T")[0]}</span>
              </p>
            </div>

            <div className="flex justify-between">
              <p className="font-normal ">
                Available: <span className="font-bold">{task.quantity}</span>
              </p>

              <p className="font-normal ">
                Reward <span className="font-bold">{task.payAmount}</span> Coins
              </p>
            </div>

            <Link to={`/dashboard/taskDetails/${task._id}`}>
              <Button>View Details</Button>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
