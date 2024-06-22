export default function ManageUsers() {
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
            <Table.Row>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
