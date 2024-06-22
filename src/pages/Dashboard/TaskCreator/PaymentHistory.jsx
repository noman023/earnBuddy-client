import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import SpinnerComponent from "../../../components/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";

export default function PaymentHistory() {
  const { user } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Employer || All Payments</title>
      </Helmet>

      <div className="overflow-x-auto mt-6">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Paid</Table.HeadCell>
            <Table.HeadCell>Transaction ID</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
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
                <Table.Cell className="text-red-500">
                  No payments found!
                </Table.Cell>
              </Table.Row>
            )}

            {data.map((data) => (
              <Table.Row key={data._id}>
                <Table.Cell>{data.email}</Table.Cell>
                <Table.Cell>${data.price}</Table.Cell>
                <Table.Cell>{data.transactionId}</Table.Cell>
                <Table.Cell>{data.date.split("T")[0]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
