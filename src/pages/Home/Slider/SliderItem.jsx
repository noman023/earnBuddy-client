export default function SliderItem({ img, heading, description }) {
  return (
    <div className="relative">
      <img src={img} className="w-full h-[500px]" alt="Slider Image 1" />

      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
            {heading}
          </h2>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}
