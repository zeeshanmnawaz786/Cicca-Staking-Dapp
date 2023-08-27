import { ContractABI, ContractAddress } from "@/lib/constant";
import { ethers } from "ethers";
import React, { useState } from "react";

export default function WithdrawTokenWithAmount() {
  const [loading, setLoading] = useState(false);

  async function withdrawTokenWithAmount() {
    if ((window as any).ethereum) {
      try {
        setLoading(true);

        const data = ContractAddress;
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(data, ContractABI, signer);

        await contract.withdrawAllToken();

        console.log("withdrawAllToken successful");
      } catch (err: any) {
        console.log("Error while withdrawTokenWithAmount:", err.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Connect to Binance Chain");
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center m-6">
        <div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-60 p-2.5  mb-5"
            placeholder="token address"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-60 p-2.5 mb-5"
            placeholder="to address"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-60 p-2.5 mb-5"
            placeholder="amount"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className={`text-white bg-red-700 hover:bg-red-800  font-normal rounded-full text-sm p-1 ps-2 pe-2 text-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={withdrawTokenWithAmount}
            disabled={loading}
          >
            {loading ? "Processing..." : "withdraw Token Amount"}
          </button>
        </div>
      </div>
    </>
  );
}
