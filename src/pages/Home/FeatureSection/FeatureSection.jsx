import incomeImg from "../../../assets/features/income.png";
import taskListImg from "../../../assets/features/task-list.png";
import paymentImg from "../../../assets/features/payment-method.png";

import FeatureItem from "./FeatureItem";

export default function FeatureSection() {
  return (
    <div className="flex flex-col md:flex-row text-blue-600 my-24">
      <FeatureItem
        img={incomeImg}
        heading={"Earn Coins by Completing Tasks"}
        description={
          "Easily earn coins by completing a variety of tasks available on the platform. Each task offers a reward amount that will be added to your account upon approval. Start earning today by engaging in tasks  that match your skills and interests."
        }
      />
      <FeatureItem
        img={taskListImg}
        heading={"Create and Manage Tasks"}
        description={
          "Task creators can effortlessly create, manage, and track tasks using our intuitiveinterface. Define specific instructions, deadlines,and rewards for each task. Review submissions and ensure quality outcomes while maintaining full control over your projects."
        }
      />
      <FeatureItem
        img={paymentImg}
        heading={"Secure Payments"}
        description={
          "Your earnings are safe with our secure payment system. Withdraw your coins seamlessly through various payment methods, ensuring quick and reliable access to your rewards. Enjoy peace of mind knowing your transactions are protected."
        }
      />
    </div>
  );
}
