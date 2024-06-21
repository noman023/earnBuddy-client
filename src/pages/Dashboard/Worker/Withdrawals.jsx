import { Helmet } from "react-helmet-async";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useUserCoins from "../../../hooks/useUserCoins";
import SpinnerComponent from "../../../components/Spinner/Spinner";
import useAxiosInstanceSecure from "../../../hooks/useAxiosInstanceSecure";
import useAuth from "../../../hooks/useAuth";

export default function Withdrawals() {
  const [selectCoin, setSelectCoin] = useState(0);
  const { register, handleSubmit, reset, watch } = useForm();

  const { user } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const { userCoins, isCoinsPending } = useUserCoins();
  const coinsPerDollar = 20;

  // calculate maxwithdraw amount
  let maxWithdrawAmount;
  if (!isCoinsPending) {
    maxWithdrawAmount = Math.floor(userCoins.coins / coinsPerDollar);
  }

  // Watch the coins input field
  const coinsValue = watch("coins");
  // update selectCoin everytime coins value change
  useEffect(() => {
    if (coinsValue) {
      setSelectCoin(coinsValue);
    }
  }, [coinsValue]);

  const onSubmit = (data) => {
    const withdrawAmount = Math.floor(parseInt(data.coins) / coinsPerDollar);

    // if withdraw amount larger than maxwithdraw amount
    if (withdrawAmount > maxWithdrawAmount) {
      return Swal.fire({
        icon: "warning",
        title: `You cannot withdraw more than $${maxWithdrawAmount}`,
      });
    }

    const postData = {
      workerName: user.displayName,
      workerEmail: user.email,
      withdrawCoin: data.coins,
      withdrawAmount: withdrawAmount,
      paymentSystem: data.paySystem,
      accountNum: data.accountNum,
      withdrawTime: new Date(),
    };

    axiosInstanceSecure
      .post("/withdraw", postData)
      .then((res) => {
        if (res.data.insertedId) {
          reset();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Withdraw request has been received!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.message,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Employee || Withdraw</title>
      </Helmet>

      <div className="space-y-10">
        <div className="bg-gray-400 text-white p-3">
          <h1 className="text-2xl">
            You can withdraw maximum: $
            {isCoinsPending ? <SpinnerComponent /> : maxWithdrawAmount}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border p-3"
        >
          <div>
            <div className="mb-2 block">
              <Label value="Coins To Withdraw" />
            </div>

            <TextInput
              {...register("coins")}
              type="number"
              placeholder="How many coins you want to withdraw?"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Withdraw Amount" />
            </div>

            <TextInput
              type="text"
              value={Math.floor(parseInt(selectCoin) / coinsPerDollar) || 0}
              readOnly
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Select Payment System" />
            </div>

            <Select {...register("paySystem")} required>
              <option value={"Nagad"}>Nagad</option>
              <option value={"Bkash"}>Bkash </option>
              <option value={"Rocket"}>Rocket </option>
            </Select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Account Number" />
            </div>

            <TextInput {...register("accountNum")} type="text" required />
          </div>

          <Button type="submit" color={"blue"}>
            Withdraw
          </Button>
        </form>
      </div>
    </>
  );
}
