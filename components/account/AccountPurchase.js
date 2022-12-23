import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

import useTransaction from "../../controls/transactionControl";
import LoaderCartItemList from "../loader/LoaderCartItemList";
import TransactionItem from "../transaction/TransactionItem";
import useAccount from "../../controls/accountControl";

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

  useEffect(() => {
    if (user && details) {
      getTransactions(details?._id);
    }
  }, [user, details]);

  const handleChange = ({ target }) => {
    setDisplay(target.textContent);
  };

  const TabButton = (props) => (
    <button
      {...props}
      className={
        ` py-2 min-w-[100px] px-2 flex-1 whitespace-nowrap ` +
        (props?.active == props?.children
          ? " bg-[#FF6363] text-white "
          : " hover:bg-orange-50 ")
      }
    >
      {props?.children}
    </button>
  );

  return (
    <div className=" flex flex-col max-w-5xl mx-auto p-3 w-full">
      <div className="bg-white shadow-sm sticky top-[90px] flex flex-wrap justify-between ">
        {["All", "To Ship", "To Receive", "Completed", "Canceled"]?.map(
          (tab) => (
            <TabButton active={display} onClick={handleChange} key={tab}>
              {tab}
            </TabButton>
          )
        )}
      </div>
      <div className="">
        {loading && <LoaderCartItemList />}
        {selectedTransactions?.map((transaction) => (
          <TransactionItem
            data={transaction}
            cancelOrder={cancelOrder}
            removeItem={removeItem}
            key={transaction?._id}
          />
        ))}
      </div>
    </div>
  );
}
