import { Helmet } from "react-helmet-async";
import AddOrUpdateTask from "../../Shared/AddOrUpdateTask";

export default function AddTask() {
  return (
    <>
      <Helmet>
        <title>Employer || Add Task</title>
      </Helmet>

      <AddOrUpdateTask />
    </>
  );
}
