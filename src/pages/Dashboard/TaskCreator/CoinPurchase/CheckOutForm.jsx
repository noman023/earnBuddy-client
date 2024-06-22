import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import useAxiosInstanceSecure from "../../../../hooks/useAxiosInstanceSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CheckOutForm({ coinPackage }) {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const axiosInstanceSecure = useAxiosInstanceSecure();
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axiosInstanceSecure
      .post("/create-payment-intent", { price: coinPackage.price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosInstanceSecure, coinPackage.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //   console.log("[error]", error);
      setError(error.message);
    } else {
      //   console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      //   console.log("confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        // console.log(paymentIntent);
        // data to save in db
        const paymentData = {
          email: user.email,
          price: coinPackage.price,
          coins: coinPackage.coins,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        // post data to db and increase user coins
        axiosInstanceSecure
          .post("/payments", paymentData)
          .then((res) => {
            if (res.data.insertedId) {
              navigate("/dashboard/coinPurchase");

              Swal.fire({
                title: "Done!",
                text: "Your coins purchase has been successfull.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "warning",
              title: err.message,
            });
          });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <Button
          className="mt-5 mx-auto"
          type="submit"
          disabled={!stripe || !clientSecret}
          color={"blue"}
        >
          Pay
        </Button>
      </form>
    </div>
  );
}
