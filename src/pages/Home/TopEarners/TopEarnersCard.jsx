import { Card } from "flowbite-react";
import manageWorkImg from "../../../assets/slider/manage-work.jpg";

export default function TopEarnersCard({ user }) {
  return (
    <Card className="max-w-sm bg-gray-100 border-blue-500">
      <div className="flex gap-5">
        <div>
          <img src={user.photoURL} alt="reviewer image" className="w-20 h-20" />
        </div>

        <div className="text-black">
          <h5 className="text-2xl">{user.name}</h5>

          <p>
            Total Coins:{" "}
            <span className="text-blue-500 font-bold">{user.coins}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
