import { Card } from "flowbite-react";
import manageWorkImg from "../../../assets/slider/manage-work.jpg";

export default function TopEarnersCard() {
  return (
    <Card className="max-w-sm bg-gray-100 border-blue-500">
      <div className="flex gap-5">
        <div>
          <img src={manageWorkImg} alt="reviewer image" className="w-20 h-20" />
        </div>

        <div className="text-black">
          <h5 className="text-2xl">Jack Grelish</h5>

          <p>
            Coin: <span className="text-blue-500 font-bold">100</span>
          </p>
          <p>
            Job Done: <span className="text-blue-600 font-bold">6</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
