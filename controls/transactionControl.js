import axios from "axios";
import create from "zustand";

const store_ = create((set) => ({
  userId: "62822059f4ad8a31e8cbd6db",
  display: "all",
  set: (data) => set(data),
}));

const baseUrl = "/api/transaction/";
export default function useTransaction() {
  const { set, userId, transactions, selectedTransactions, display } = store_();

  const getTransactions = async () => {
    const res = await axios.get(baseUrl + "?userId=" + userId);
    console.log(res.data);
    set({ transactions: res.data, selectedTransactions: res.data });
    setDisplay(display, res.data);
  };

  const cancelOrder = async (id) => {
    const res = await axios.delete(baseUrl + id + `?type=cancel`);
    await getTransactions();

    // const transactions_ = transactions?.map((t) =>
    //   t?._id == res.data?._id ? res.data : t
    // );
    // set({ transactions: transactions_ });
    // console.log(display);
    // setDisplay(display || "all", transactions_);
  };

  const removeItem = async (id) => {
    const res = await axios.delete(baseUrl + id + `?type=remove`);
    await getTransactions();

    // const transactions_ = transactions?.filter((p) => p?._id != id);
    // set({ transactions: transactions_ });
    // console.log({ display, transactions_ });
    // setDisplay(display || "all", transactions_);
  };

  const setDisplay = (value, transactions_ = transactions) => {
    console.log(display);
    console.log(transactions_);
    set({ selectedTransactions: [] });
    switch (value) {
      case "All":
        return set({ selectedTransactions: transactions_, display: "All" });
      case "To Ship":
        return set({
          selectedTransactions: transactions_?.filter(
            (p) => p.status === "packing" && p.canceled == false
          ),
          display: "To Ship",
        });
      case "To Recieve":
        return set({
          selectedTransactions: transactions_?.filter(
            (p) => p.status === "receiving" && p.canceled == false
          ),
          display: "To Recieve",
        });
      case "Completed":
        return set({
          selectedTransactions: transactions_?.filter(
            (p) => p.status === "completed" && p.canceled == false
          ),
          display: "Completed",
        });
      case "Canceled":
        return set({
          selectedTransactions: transactions_?.filter(
            (p) => p.canceled == true
          ),
          display: "Canceled",
        });
      default:
        return set({ selectedTransactions: transactions_, display: "All" });
    }
  };

  return {
    display,
    transactions,
    selectedTransactions,
    getTransactions,
    cancelOrder,
    setDisplay,
    removeItem,
  };
}
