import { Badge, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";

export default function WorkerHome() {
  return (
    <>
      <Helmet>
        <title>Employee || Home</title>
      </Helmet>

      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Task Title</Table.HeadCell>
            <Table.HeadCell>Payable Amount</Table.HeadCell>
            <Table.HeadCell>Employer Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell>Video Editing</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>Mojammel Noman</Table.Cell>
              <Table.Cell>
                <Badge color="success" size={"sm"} className="p-1">
                  Approved
                </Badge>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
