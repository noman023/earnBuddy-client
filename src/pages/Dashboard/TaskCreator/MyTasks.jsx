import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";

import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";
import SpinnerComponent from "../../../components/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

export default function MyTasks() {
  const { user } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myTasks"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/tasks?email=${user.email}`);
      return res.data;
    },
  });

  // delete task
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstanceSecure
          .delete(`/tasks/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              refetch();

              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
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
    <div className="overflow-x-auto ">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Task Title</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Payable Amount</Table.HeadCell>
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
              <Table.Cell className="text-red-500">No task found!</Table.Cell>
            </Table.Row>
          )}

          {data.map((task) => (
            <Table.Row key={task._id} className="bg-white ">
              <Table.Cell className=" ">{task.title}</Table.Cell>
              <Table.Cell>{task.quantity}</Table.Cell>
              <Table.Cell>{task.payAmount} Coins</Table.Cell>

              <Table.Cell className="flex gap-1 flex-col md:flex-row">
                <Button>Update</Button>
                <Button
                  color={"failure"}
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
