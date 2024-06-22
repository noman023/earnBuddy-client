import { Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";

export default function AdminHome() {
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
            <Table.Row>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
