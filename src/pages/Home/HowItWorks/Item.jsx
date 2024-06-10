export default function Item({ img, heading, description }) {
  return (
    <div className="border p-3 space-y-5">
      <div className="w-24 h-24 text-center mx-auto">
        <img src={img} alt="image" />
      </div>

      <div className="max-w-60">
        <div>
          <h2 className="text-white font-semibold text-xl">{heading} </h2>
          <hr className="my-2" />
          <p className="">{description}</p>
        </div>
      </div>
    </div>
  );
}
