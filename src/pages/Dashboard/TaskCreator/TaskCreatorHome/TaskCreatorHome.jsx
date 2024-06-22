import { Button, Modal, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import useAxiosInstanceSecure from "../../../../hooks/useAxiosInstanceSecure";
import useAuth from "../../../../hooks/useAuth";
import SpinnerComponent from "../../../../components/Spinner/Spinner";
import TableRowHome from "./TableRowHome";
import StatCard from "../../../Shared/StatCard";

export default function TaskCreatorHome() {
  const { user } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pendingTask"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(
        `/submission/${user.email}?role=taskCreator`
      );
      return res.data;
    },
  });

  const { data: creatorStats = {} } = useQuery({
    queryKey: ["creatorStats"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/creatorStats/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Employer || Home</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          text={"Available Coins"}
          amount={creatorStats.availableCoins}
        />
        <StatCard text={"Pending Tasks"} amount={creatorStats.pendingTasks} />
        <StatCard
          text={"Total Payments"}
          amount={`$${creatorStats.totalPayments}`}
        />
      </div>

      <div className="overflow-x-auto mt-6">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Employee</Table.HeadCell>
            <Table.HeadCell>Task Title</Table.HeadCell>
            <Table.HeadCell>Payable Amount</Table.HeadCell>
            <Table.HeadCell>View Submission</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {/* show spinner while loading */}
            {isPending && (
              <Table.Row>
                <Table.Cell>
                  <SpinnerComponent />
                </Table.Cell>
              </Table.Row>
            )}

            {/* if no data show text  */}
            {data.length === 0 && (
              <Table.Row>
                <Table.Cell className="text-red-500">No task found!</Table.Cell>
              </Table.Row>
            )}

            {/* show data */}
            {data.map((task) => (
              <TableRowHome task={task} key={task._id} refetch={refetch} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
