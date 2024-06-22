import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";

import useAxiosInstanceSecure from "../../../../hooks/useAxiosInstanceSecure";

export default function TableRowHome({ task, refetch }) {
  const [openModal, setOpenModal] = useState(false);
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const hanldeApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // hit the approve api
        axiosInstanceSecure
          .patch(`/subApprove/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();

              Swal.fire({
                title: "Approved!",
                text: "This submission has been approved.",
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

  const hanldeReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // hit the reject api
        axiosInstanceSecure
          .patch(`/subReject/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();

              Swal.fire({
                title: "Rejected!",
                text: "This submission has been rejected.",
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
      <Table.Row>
        <Table.Cell>
          {task.workerName} -{task.workerEmail}
        </Table.Cell>
        <Table.Cell>{task.title}</Table.Cell>
        <Table.Cell>{task.payAmount}</Table.Cell>

        <Table.Cell>
          <Button color={"blue"} onClick={() => setOpenModal(true)}>
            View
          </Button>
        </Table.Cell>

        <Table.Cell className="flex gap-1 flex-col md:flex-row">
          <Button color={"success"} onClick={() => hanldeApprove(task._id)}>
            Approve
          </Button>

          <Button color={"failure"} onClick={() => hanldeReject(task._id)}>
            Reject
          </Button>
        </Table.Cell>
      </Table.Row>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Employee's Submission Data</Modal.Header>

        <Modal.Body>{task.submittedData}</Modal.Body>
      </Modal>
    </>
  );
}
