import { useEffect } from "react";
import useAccount from "../../controls/accountControl";
import useTransaction from "../../controls/transactionControl";
import TransactionItem from "../transaction/TransactionItem";

function TransactionPage() {
  const { details } = useAccount();
  const {
    set,
    getTransactions,
    selectedTransactions,
    cancelOrder,
    setDisplay,
    removeItem,
  } = useTransaction();

  useEffect(() => {
    set({ userId: details?._id });
    getTransactions(details?._id);
  }, [details]);


  return (
    <div>
      <header>
        <button onClick={getTransactions}>get transactions</button>
        <nav className="flex justify-between px-5">
          <menu>
            <button onClick={(_) => setDisplay("all")}>Packing</button>
          </menu>
          <menu>
            <button onClick={(_) => setDisplay("packing")}>Packing</button>
          </menu>
          <menu>
            <button onClick={(_) => setDisplay("paying")}>To Pay</button>
          </menu>
          <menu>
            <button onClick={(_) => setDisplay("shiping")}>To Ship</button>
          </menu>
          <menu>
            <button onClick={(_) => setDisplay("receiving")}>To Ship</button>
          </menu>
          <menu>
            <button onClick={(_) => setDisplay("completed")}>To Pay</button>
          </menu>
          <menu>
            <button onClick={(_) => setDisplay("canceled")}>Canceled</button>
          </menu>
        </nav>
      </header>
      <main>
        {selectedTransactions?.map((transaction) => (
          <TransactionItem
            data={transaction}
            cancelOrder={cancelOrder}
            removeItem={removeItem}
            key={transaction?._id}
          />
        ))}
      </main>
    </div>
  );
}

export default TransactionPage;
