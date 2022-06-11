import axios from "axios";
import create from "zustand";

const store_ = create((set) => ({
  userId: "62822059f4ad8a31e8cbd6db",
  display: "All",
  loading: true,
  set: (data) => set(data),
}));

const baseUrl = "/api/transaction/";
export default function useTransaction() {
  const { set, userId, transactions, selectedTransactions, display, loading } =
    store_();

  const getTransactions = async (userId) => {
    console.log(userId);
    set({ loading: true, userId });
    try {
      const res = await axios.get(baseUrl + "?userId=" + userId);
      set({
        transactions: res.data,
        selectedTransactions: res.data,
        loading: false,
      });
      setDisplay(display, res.data);
    } catch (error) {
      console.log("has error", error);
      set({ loading: false });
    }
  };

  const cancelOrder = async (id) => {
    const res = await axios.delete(baseUrl + id + `?type=cancel`);
    await getTransactions(userId);
  };

  const removeItem = async (id) => {
    const res = await axios.delete(baseUrl + id + `?type=remove`);
    await getTransactions(userId);
  };

  const setDisplay = (value, transactions_ = transactions) => {
    console.log(value);
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
      case "To Receive":
        return set({
          selectedTransactions: transactions_?.filter(
            (p) => p.status === "receiving" && p.canceled == false
          ),
          display: "To Receive",
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
    loading,
    display,
    transactions,
    selectedTransactions,
    getTransactions,
    cancelOrder,
    setDisplay,
    removeItem,
  };
}
