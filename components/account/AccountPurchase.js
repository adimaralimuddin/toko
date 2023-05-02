import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

import useAccount from "../../controls/accountControl";
import useTransaction from "../../controls/transactionControl";
import LoaderCartItemList from "../loader/LoaderCartItemList";
import TransactionItem from "../transaction/TransactionItem";
import { useRouter } from "next/router";

export default function AccountPurchase() {
  const { user } = useUser();
  const { details } = useAccount();

  const {
    loading,
    getTransactions,
    selectedTransactions,
    cancelOrder,
    removeItem,
    setDisplay,
    display,
  } = useTransaction();

  const { query } = useRouter();
  const { sessionId, userId } = query;

  useEffect(() => {
    if (user && details) {
      getTransactions(details?._id);
    }
  }, [user, details]);

  useEffect(() => {
    if (!sessionId) return;
    getResult();
  }, [sessionId]);

  const getResult = async () => {
    const res = await fetch(
      `/api/stripe/session/${sessionId}?userId=${userId}`
    );
    const r2 = await res.json();
  };

  const handleChange = ({ target }) => {
    setDisplay(target.textContent);
  };

  const TabButton = (props) => (
    <button
      {...props}
      className={
        ` py-2 min-w-[100px] px-2 flex-1 whitespace-nowrap ` +
        (props?.active == props?.children
          ? " bg-primary text-white "
          : " hover:bg-purple-50 ")
      }
    >
      {props?.children}
    </button>
  );

  return (
    <div className="flex-1 bg-green-500d flex flex-col max-w-5xl mx-auto w-full">
      <div className="bg-white shadow-sm sticky top-[106px] flex flex-wrap justify-between z-10">
        {["All", "To Ship", "To Receive", "Completed", "Canceled"]?.map(
          (tab) => (
            <TabButton active={display} onClick={handleChange} key={tab}>
              {tab}
            </TabButton>
          )
        )}
      </div>
      <div className=" flex-1">
        {loading && <LoaderCartItemList />}
        {selectedTransactions?.map((transaction, i) => (
          <TransactionItem
            data={transaction}
            cancelOrder={cancelOrder}
            removeItem={removeItem}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
