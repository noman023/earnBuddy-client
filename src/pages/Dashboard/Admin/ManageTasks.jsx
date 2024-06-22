import { Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";

export default function ManageTasks() {
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
            <Table.Row>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
