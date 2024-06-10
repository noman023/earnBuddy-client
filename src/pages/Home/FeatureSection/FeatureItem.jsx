export default function FeatureItem({ img, heading, description }) {
  return (
    <div className="border p-5">
      <div className="w-52 h-52 mx-auto">
        <img src={img} alt="dollar img" />
      </div>

      <div>
        <h2 className="text-xl my-2 text-center font-bold">{heading}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
