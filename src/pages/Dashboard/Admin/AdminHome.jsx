import { Button, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";

import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";
import { useQuery } from "@tanstack/react-query";
import SpinnerComponent from "../../../components/Spinner/Spinner";
import Swal from "sweetalert2";

export default function AdminHome() {
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["withdraw"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/withdraw`);
      return res.data;
    },
  });

  const handlePayment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this payment?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        // approve user payment and delete withdraw post
        axiosInstanceSecure
          .delete(`/withdrawApprove/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              refetch();

              Swal.fire({
                title: "Approved!",
                text: "Payment withdraw approved.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "warning",
              title: err.message,
            });
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin || Home</title>
      </Helmet>

      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Employee Name</Table.HeadCell>
            <Table.HeadCell>Withdraw Amount</Table.HeadCell>
            <Table.HeadCell>Withdraw Coin</Table.HeadCell>
            <Table.HeadCell>Payment Number</Table.HeadCell>
            <Table.HeadCell>Payment System</Table.HeadCell>
            <Table.HeadCell>Withdraw Time</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {/* spinner while fetching data */}
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
                  No withdraw data found!
                </Table.Cell>
              </Table.Row>
            )}

            {data.map((post) => (
              <Table.Row key={post._id}>
                <Table.Cell>{post.workerName}</Table.Cell>
                <Table.Cell>{post.withdrawAmount}</Table.Cell>
                <Table.Cell>{post.withdrawCoin}</Table.Cell>
                <Table.Cell>{post.accountNum}</Table.Cell>
                <Table.Cell>{post.paymentSystem}</Table.Cell>
                <Table.Cell>{post.withdrawTime.split("T")[1]}</Table.Cell>
                <Table.Cell>
                  <Button
                    color={"blue"}
                    onClick={() => handlePayment(post._id)}
                  >
                    Payment Approve
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
