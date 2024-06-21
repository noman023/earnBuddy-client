import { Badge, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import StatCard from "../../Shared/StatCard";
import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";
import useAuth from "../../../hooks/useAuth";

export default function WorkerHome() {
  const { user } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const { data = {} } = useQuery({
    queryKey: ["workerStats"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/workerStats/${user.email}`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Employee || Home</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard text={"Available Coins"} amount={data.availableCoins} />
        <StatCard text={"Total Submission"} amount={data.totalSubmissions} />
        <StatCard text={"Total Earnings"} amount={`$${data.totalEarnings}`} />
      </div>

      <div className="overflow-x-auto mt-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Task Title</Table.HeadCell>
            <Table.HeadCell>Payable Amount</Table.HeadCell>
            <Table.HeadCell>Employer Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell>Video Editing</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>Mojammel Noman</Table.Cell>
              <Table.Cell>
                <Badge color="success" size={"sm"} className="p-1">
                  Approved
                </Badge>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
