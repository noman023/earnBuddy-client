import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
export default function CoinPurchase() {
  return (
    <>
      <Helmet>
        <title>Employer || Purchase Coin</title>
      </Helmet>

      <div className="flex gap-5 mb-4">
        <div className="bg-gray-400 p-4 text-white">
          <p>10 coins = 1 dollar.</p>
        </div>

        <div className="bg-gray-400 p-4 text-white">
          <p>100 coins = 9 dollars.</p>
        </div>

        <div className="bg-gray-400 p-4 text-white">
          <p>500 coin = 19 dollars.</p>
        </div>

        <div className="bg-gray-400 p-4 text-white">
          <p>1000 coin = 39 dollars</p>
        </div>
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </>
  );
}
