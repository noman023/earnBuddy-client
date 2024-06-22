import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Label, Textarea } from "flowbite-react";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import useAxiosInstanceSecure from "../../../../hooks/useAxiosInstanceSecure";
import useAuth from "../../../../hooks/useAuth";
import TaskDetailsCard from "../../../Shared/TaskDetailsCard";

export default function TaskDetails() {
  const wholeTask = useLoaderData();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const axiosInstanceSecure = useAxiosInstanceSecure();
  const { user } = useAuth();

  const onSubmit = (data) => {
    // add user info to whole task
    const postData = {
      ...wholeTask,
      workerName: user.displayName,
      workerEmail: user.email,
      status: "pending",
      submittedData: data.subData,
    };

    // add data to db
    axiosInstanceSecure
      .post("/submission", postData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your submission was successfully done!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/dashboard/taskList");
        }
      })
      .catch((err) =>
        Swal.fire({
          icon: "warning",
          title: err.message,
        })
      );
  };

  return (
    <>
      <Helmet>
        <title>Employee || Task Details</title>
      </Helmet>

      <div className="border border-gray-300 p-5 space-y-3">
        <TaskDetailsCard task={wholeTask} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label value="Submission Details" />
            </div>

            <Textarea
              {...register("subData")}
              placeholder="Submit your work here."
              required
            />
          </div>

          <Button type="submit" className="mt-3 mx-auto">
            Submit Task
          </Button>
        </form>
      </div>
    </>
  );
}
