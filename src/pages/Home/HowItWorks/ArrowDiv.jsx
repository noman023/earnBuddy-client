import { FaArrowRightLong, FaArrowDownLong } from "react-icons/fa6";

export default function ArrowDiv() {
  return (
    <div>
      <FaArrowRightLong className=" text-3xl hidden md:block" />
      <FaArrowDownLong className=" text-3xl md:hidden" />
    </div>
  );
}
