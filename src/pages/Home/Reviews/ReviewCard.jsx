import { Card } from "flowbite-react";
import manageWorkImg from "../../../assets/slider/manage-work.jpg";

export default function ReviewCard() {
  return (
    <Card className="max-w-sm bg-gray-100 border-blue-500">
      <div className="flex gap-7">
        <div>
          <img
            src={manageWorkImg}
            alt="reviewer image"
            className="rounded-br-3xl w-20 h-20"
          />
        </div>

        <div className="text-black dark:text-white">
          <h5 className="text-2xl font-bold ">Jack Grelish</h5>

          <p className="">Employee</p>
        </div>
      </div>

      <div className="flex justify-between font-normal text-gray-700 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa deleniti,
        maiores velit eos exercitationem voluptatem beatae dolores et quidem
        tempora cupiditate veritatis soluta doloribus consequuntur assumenda
        explicabo error dolor a?
      </div>
    </Card>
  );
}
