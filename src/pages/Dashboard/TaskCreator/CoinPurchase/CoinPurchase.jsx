import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function CoinPurchase() {
  const coinPackages = [
    { coins: 10, price: 1 },
    { coins: 100, price: 9 },
    { coins: 500, price: 19 },
    { coins: 1000, price: 39 },
  ];

  return (
    <>
      <Helmet>
        <title>Employer || Purchase Coin</title>
      </Helmet>

      <h1 className="text-blue-500 text-2xl md:text-3xl font-bold text-center mb-7">
        Select a package
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coinPackages.map((pkg, idx) => (
          <Link to="/dashboard/paymentCard" state={pkg} key={idx}>
            <div className="bg-gray-400 p-4 text-white hover:bg-gray-500 rounded-xl">
              <p>
                {pkg.coins} coins = {pkg.price} dollar
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
