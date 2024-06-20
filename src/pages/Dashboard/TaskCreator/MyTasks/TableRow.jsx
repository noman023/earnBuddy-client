import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";

import AddOrUpdateTask from "../../../Shared/AddOrUpdateTask";

export default function TableRow({ task, handleDelete }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Table.Row key={task._id} className="bg-white ">
        <Table.Cell className=" ">{task.title}</Table.Cell>
        <Table.Cell>{task.quantity}</Table.Cell>
        <Table.Cell>{task.payAmount} Coins</Table.Cell>

        <Table.Cell className="flex gap-1 flex-col md:flex-row">
          <Button onClick={() => setOpenModal(true)}>Update</Button>
          <Button color={"failure"} onClick={() => handleDelete(task._id)}>
            Delete
          </Button>
        </Table.Cell>
      </Table.Row>

      {/* modal to update task */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Task</Modal.Header>

        <Modal.Body>
          <AddOrUpdateTask taskData={task} closeModal={setOpenModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}
