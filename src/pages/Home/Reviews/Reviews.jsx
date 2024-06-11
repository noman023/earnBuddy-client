import ReviewCard from "./ReviewCard";
export default function Reviews() {
  return (
    <div className="my-24">
      <div className="text-3xl md:text-4xl text-black text-center mb-10">
        <h1>
          T<span className="text-blue-500">e</span>stim
          <span className="text-blue-500">o</span>nial
        </h1>
      </div>

      <div className="">
        <ReviewCard />
      </div>
    </div>
  );
}
