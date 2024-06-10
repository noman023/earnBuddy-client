import registerImg from "../../../assets/HowItWorks/register.png";
import taskImg from "../../../assets/HowItWorks/task.png";
import incomeImg from "../../../assets/HowItWorks/income.png";

import Item from "./Item";
import ArrowDiv from "./ArrowDiv";

export default function HowItWorksSection() {
  return (
    <div className="bg-blue-900 my-24 py-10 md:py-20 text-center text-gray-200">
      <div className="mb-10 md:mb-20">
        <h1 className="text-3xl md:text-4xl font-bold">How It Works?</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
        <Item
          img={registerImg}
          heading={"Register"}
          description={"Register yourself on our platform."}
        />

        <ArrowDiv />

        <Item
          img={taskImg}
          heading={"Complete Task"}
          description={"Complete tasks from the dashboard's task list"}
        />

        <ArrowDiv />

        <Item
          img={incomeImg}
          heading={"Earn Rewards"}
          description={"Submit your work and receive rewards upon approval."}
        />
      </div>
    </div>
  );
}
