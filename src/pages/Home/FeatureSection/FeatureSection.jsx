import incomeImg from "../../../assets/features/income.png";
import taskListImg from "../../../assets/features/task-list.png";
import paymentImg from "../../../assets/features/payment-method.png";
export default function FeatureSection() {
  return (
    <div className="flex flex-col md:flex-row text-blue-600 my-10">
      {/* div 1 */}
      <div className="border p-5">
        <div className="w-52 h-52 mx-auto">
          <img src={incomeImg} alt="dollar img" />
        </div>

        <div>
          <h2 className="text-xl my-2 text-center font-bold">
            Earn Coins by Completing Tasks
          </h2>
          <p className="text-gray-600">
            Easily earn coins by completing a variety of tasks available on the
            platform. Each task offers a reward amount that will be added to
            your account upon approval. Start earning today by engaging in tasks
            that match your skills and interests.
          </p>
        </div>
      </div>

      {/* div 2 */}
      <div className="border  p-5 ">
        <div className="w-52 h-52 mx-auto">
          <img src={taskListImg} alt="dollar img" />
        </div>

        <div>
          <h2 className="text-xl my-2 text-center font-bold">
            Create and Manage Tasks
          </h2>
          <p className="text-gray-600">
            Task creators can effortlessly create, manage, and track tasks using
            our intuitive interface. Define specific instructions, deadlines,
            and rewards for each task. Review submissions and ensure quality
            outcomes while maintaining full control over your projects.
          </p>
        </div>
      </div>

      {/* div 3 */}
      <div className="border p-5 ">
        <div className="w-52 h-52 mx-auto">
          <img src={paymentImg} alt="dollar img" />
        </div>

        <div>
          <h2 className="text-xl my-2 text-center font-bold">
            Secure Payments
          </h2>
          <p className="text-gray-600">
            Your earnings are safe with our secure payment system. Withdraw your
            coins seamlessly through various payment methods, ensuring quick and
            reliable access to your rewards. Enjoy peace of mind knowing your
            transactions are protected.
          </p>
        </div>
      </div>
    </div>
  );
}
