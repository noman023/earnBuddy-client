import { Button, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";

export default function TaskCreatorHome() {
  return (
    <div>
      <Helmet>
        <title>Employer || Home</title>
      </Helmet>

      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Employee</Table.HeadCell>
            <Table.HeadCell>Task Title</Table.HeadCell>
            <Table.HeadCell>Payable Amount</Table.HeadCell>
            <Table.HeadCell>View Submission</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell>Mojammel Noman - noman@email.com</Table.Cell>
              <Table.Cell>Video Editing</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>
                <Button color={"blue"}>View Submission</Button>
              </Table.Cell>

              <Table.Cell className="flex gap-1 flex-col md:flex-row">
                <Button color={"success"}>Approve</Button>
                <Button color={"failure"}>Reject</Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
