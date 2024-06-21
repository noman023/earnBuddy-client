import { Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";
import useAuth from "../../../hooks/useAuth";

export default function MySubmissions() {
  const { user } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const { data = [] } = useQuery({
    queryKey: ["mySubmission"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(
        `/submission?email=${user.email}`
      );
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Employee || Submissions</title>
      </Helmet>

      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Task Title</Table.HeadCell>
            <Table.HeadCell>Payable Amount</Table.HeadCell>
            <Table.HeadCell>Employer Name</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {data.length === 0 && (
              <Table.Row>
                <Table.Cell className="text-red-500">No data found!</Table.Cell>
              </Table.Row>
            )}

            {data.map((post) => (
              <Table.Row key={post._id}>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.payAmount}</Table.Cell>
                <Table.Cell>{post.creatorName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
