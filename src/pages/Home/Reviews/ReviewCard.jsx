import { Card } from "flowbite-react";

export default function ReviewCard({ data }) {
  const { name, photoURL, review, role } = data;

  return (
    <Card className="max-w-lg bg-gray-100 border-blue-500">
      <div className="flex gap-7">
        <div>
          <img
            src={photoURL}
            alt="reviewer image"
            className="rounded-br-3xl w-20 h-20"
          />
        </div>

        <div className="text-black dark:text-white">
          <h5 className="text-2xl font-bold ">{name}</h5>

          <p className="">{role === "worker" ? "Employee" : "Employer"}</p>
        </div>
      </div>

      <div className="flex justify-between font-normal text-gray-700 dark:text-gray-400">
        {review}
      </div>
    </Card>
  );
}
