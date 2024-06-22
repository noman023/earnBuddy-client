import { Button, Select, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";
import SpinnerComponent from "../../../components/Spinner/Spinner";

export default function ManageUsers() {
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["workerUser"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/users?role=worker`);
      return res.data;
    },
  });

  // change user role
  const handleRoleChange = (userId, newRole) => {
    axiosInstanceSecure.patch(`/users/${userId}`, { newRole }).then((res) => {
      refetch();
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete user
        axiosInstanceSecure
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();

              Swal.fire({
                title: "Delete!",
                text: "User has been deleted.",
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
        <title>Admin || Manage Users</title>
      </Helmet>

      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>Employer</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Coins</Table.HeadCell>
            <Table.HeadCell>Update Role</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
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

            {data.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  <img
                    src={user.photoURL}
                    alt="user photo"
                    className="w-16 h-14"
                  />
                </Table.Cell>

                <Table.Cell>
                  {user.name}-{user.email}
                </Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.coins}</Table.Cell>

                <Table.Cell>
                  <Select
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="worker">Employee</option>
                    <option value="taskCreator">Employer</option>
                    <option value="admin">Admin</option>
                  </Select>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color={"failure"}
                    onClick={() => handleDelete(user._id)}
                  >
                    Remove
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
