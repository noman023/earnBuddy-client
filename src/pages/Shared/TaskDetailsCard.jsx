import TaskCountdown from "../Dashboard/Worker/TaskDetails/TaskCountDown";

export default function TaskDetailsCard({ task }) {
  return (
    <div>
      <div className="border border-gray-300 flex flex-col lg:flex-row gap-4 p-2">
        <div className="">
          <img src={task.photoURL} alt="task photo" className="max-w-96" />
        </div>

        <div className="space-y-2">
          <h5 className="text-xl font-bold tracking-tight text-gray-900">
            {task.title}
          </h5>

          <p className="font-normal text-gray-500">{task.details}</p>

          <div className="text-black space-y-2">
            <div className="flex gap-5">
              <p>
                <span className="text-blue-500">Available Submit:</span>{" "}
                {task.quantity}
              </p>
              <p>
                <span className="text-blue-500">Reward:</span> {task.payAmount}{" "}
                Coins
              </p>
            </div>

            <p className="font-normal">
              <span className="text-blue-500">Deadline: </span>
              <TaskCountdown completionDate={task.lastDate} />
            </p>
            <p>
              <span className="text-blue-500">What to Submit: </span>
              {task.submitInfo}
            </p>
            <p>
              <span className="text-blue-500">Employer: </span>
              {task.creatorName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
