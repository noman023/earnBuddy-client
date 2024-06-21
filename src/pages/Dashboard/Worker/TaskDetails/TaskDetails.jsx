import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Label, Textarea } from "flowbite-react";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import TaskCountdown from "./TaskCountDown";
import useAxiosInstanceSecure from "../../../../hooks/useAxiosInstanceSecure";
import useAuth from "../../../../hooks/useAuth";

export default function TaskDetails() {
  const wholeTask = useLoaderData();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const axiosInstanceSecure = useAxiosInstanceSecure();
  const { user, loading } = useAuth();

  const {
    title,
    details,
    photoURL,
    quantity,
    payAmount,
    lastDate,
    submitInfo,
    creatorName,
  } = wholeTask;

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
    <div className="border border-gray-300 p-5 space-y-3">
      <div className="border border-gray-300 flex flex-col lg:flex-row gap-4 p-2">
        <div className="">
          <img src={photoURL} alt="task photo" className="max-w-96" />
        </div>

        <div className="space-y-2">
          <h5 className="text-xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>

          <p className="font-normal text-gray-500">{details}</p>

          <div className="text-black space-y-2">
            <div className="flex gap-5">
              <p>
                <span className="text-blue-500">Available Submit:</span>{" "}
                {quantity}
              </p>
              <p>
                <span className="text-blue-500">Reward:</span> {payAmount} Coins
              </p>
            </div>
            {/* <span className="text-blue-500"></span> */}
            <p className="font-normal">
              <span className="text-blue-500">Deadline: </span>
              <TaskCountdown completionDate={lastDate} />
            </p>
            <p>
              <span className="text-blue-500">What to Submit: </span>
              {submitInfo}
            </p>
            <p>
              <span className="text-blue-500">Employer: </span>
              {creatorName}
            </p>
          </div>
        </div>
      </div>

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
  );
}
