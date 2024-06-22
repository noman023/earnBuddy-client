import { Button, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import useAxiosInstanceSecure from "../../../../hooks/useAxiosInstanceSecure";
import { useQuery } from "@tanstack/react-query";
import SpinnerComponent from "../../../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import TableRowTask from "./TableRowTask";

export default function ManageTasks() {
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["manageTask"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/tasks`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this task?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete task
        axiosInstanceSecure
          .delete(`/tasks/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();

              Swal.fire({
                title: "Delete!",
                text: "Task has been deleted.",
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
        <title>Admin || Manage Task</title>
      </Helmet>

      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Employer Name</Table.HeadCell>
            <Table.HeadCell>Task Quantity</Table.HeadCell>
            <Table.HeadCell>Payable Amount</Table.HeadCell>
            <Table.HeadCell>Task Availability</Table.HeadCell>
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
                  No task data found!
                </Table.Cell>
              </Table.Row>
            )}

            {data.map((task) => (
              <TableRowTask
                key={task._id}
                task={task}
                handleDelete={handleDelete}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
