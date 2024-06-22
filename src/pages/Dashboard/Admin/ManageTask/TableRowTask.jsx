import { Button, Modal, Table } from "flowbite-react";
import TaskDetailsCard from "../../../Shared/TaskDetailsCard";
import { useState } from "react";

export default function TableRowTask({ task, handleDelete }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Table.Row key={task._id}>
        <Table.Cell>{task.title}</Table.Cell>
        <Table.Cell>{task.creatorName}</Table.Cell>
        <Table.Cell>{task.quantity}</Table.Cell>
        <Table.Cell>{task.payAmount}</Table.Cell>
        <Table.Cell>{task.quantity}</Table.Cell>

        <Table.Cell className="flex flex-col md:flex-row gap-2">
          <Button color={"blue"} onClick={() => setOpenModal(true)}>
            View Task
          </Button>

          <Button color={"failure"} onClick={() => handleDelete(task._id)}>
            Delete Task
          </Button>
        </Table.Cell>
      </Table.Row>

      {/* modal to update task */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Task Details</Modal.Header>

        <Modal.Body>
          <TaskDetailsCard task={task} />
        </Modal.Body>
      </Modal>
    </>
  );
}
