import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

export default function PaymentCard() {
  const location = useLocation();

  return (
    <div>
      <h1 className="text-xl text-blue-500 font-bold text-center mb-6">
        ${location.state.price} will be deducted from your card.
      </h1>

      <Elements stripe={stripePromise}>
        <CheckOutForm coinPackage={location.state} />
      </Elements>
    </div>
  );
}
