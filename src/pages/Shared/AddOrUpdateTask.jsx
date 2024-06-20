import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import useAxiosInstanceSecure from "../../hooks/useAxiosInstanceSecure";
import useAuth from "../../hooks/useAuth";
import useUserCoins from "../../hooks/useUserCoins";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useNavigation } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AddOrUpdateTask({ taskData, closeModal }) {
  const { register, handleSubmit, reset, control } = useForm();

  // custom hooks
  const { user } = useAuth();
  const { userCoins } = useUserCoins();
  const axiosInstanceSecure = useAxiosInstanceSecure();
  const axiosInstance = useAxiosInstance();

  // on adding task
  const onAdd = async (data) => {
    const quantityInt = parseInt(data.quantity);
    const amountInt = parseInt(data.amount);
    const totalCoins = quantityInt * amountInt;

    // if total coins greater than user actuall coins
    if (totalCoins > userCoins.coins) {
      return Swal.fire({
        title: "Not available Coin!",
        text: "Not available Coin. Please Purchase Coin.",
        icon: "error",
      });
    }

    // host image to imgbb
    const imageFile = { image: data.photo[0] };
    const response = await axiosInstance.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imgUrl = response.data.data.display_url;

    const postData = {
      title: data.title,
      details: data.details,
      quantity: quantityInt,
      payAmount: amountInt,
      lastDate: data.date,
      submitInfo: data.instruction,
      photoURL: imgUrl,
      creatorEmail: user.email,
      creatorName: user.displayName,
      currentTime: new Date(),
    };

    // add data to db
    axiosInstanceSecure
      .post("/tasks", postData)
      .then((res) => {
        if (res.data.insertedId) {
          reset(); // reset form

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.message,
        });
      });
  };

  // on updating task
  const onUpdate = (data) => {
    const updateData = {
      title: data.title,
      details: data.details,
      submitInfo: data.instruction,
    };

    // send update data to db
    axiosInstanceSecure
      .patch(`/tasks/${taskData._id}`, updateData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.message,
        });
      });

    //close modal
    closeModal(false);
  };

  //  set callBack based on taskData
  const callBack = taskData ? onUpdate : onAdd;

  return (
    <form
      className="flex flex-col gap-4 border rounded-lg p-3 mb-5"
      onSubmit={handleSubmit(callBack)}
    >
      <div>
        <div className="mb-2 block">
          <Label value="Task Title" />
        </div>
        <TextInput
          defaultValue={taskData && taskData.title}
          {...register("title")}
          type="text"
          placeholder="ex: Video Editing"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label value="Task Details" />
        </div>
        <TextInput
          defaultValue={taskData && taskData.details}
          {...register("details")}
          type="text"
          placeholder="ex: Edit a 10-minute video..."
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label value="Task Quantity" />
        </div>
        <TextInput
          defaultValue={taskData && taskData.quantity}
          {...register("quantity")}
          type="number"
          placeholder="ex: 1 or 2"
          required
          readOnly
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label value="Payable Amount" />
        </div>

        <TextInput
          defaultValue={taskData && taskData.payAmount}
          {...register("amount")}
          type="number"
          placeholder="Amount for every submission ex: 2/5$ "
          required
          readOnly
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label value="Completion Date" />
        </div>

        <Controller
          defaultValue={taskData && taskData.lastDate}
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              showIcon
              selected={field.value}
              onChange={field.onChange}
              className="bg-gray-100"
              readOnly
            />
          )}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label value="Submission Instruction" />
        </div>
        <TextInput
          defaultValue={taskData && taskData.submitInfo}
          {...register("instruction")}
          type="text"
          placeholder="ex: submit pdf/doc file"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label value="Task Image" />
        </div>
        <FileInput
          disabled={taskData}
          {...register("photo")}
          id="file-upload"
        />
      </div>

      <Button type="submit">{taskData ? "Update" : "Add"}</Button>
    </form>
  );
}
