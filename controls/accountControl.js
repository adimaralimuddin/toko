import create from "zustand";
import axios from "axios";

const store = create((set) => ({
  set: (data) => set(data),
}));

const url = `/api/account`;

export default function useAccount() {
  const { set, details } = store();

  const getAccountDetails = async (email) => {
    const res = await axios.get(url + `?email=${email}`);
    set({ details: res.data });
  };

  const updateField = async (field, email) => {
    const res = await axios.put(url + `?email=${email}`, field);
    set({ details: res.data });
  };

  const fullAddress = () =>
    `${details?.country}, ${details?.city}, ${details?.houseNumber}`;

  return {
    set,
    details,
    updateField,
    getAccountDetails,
    fullAddress,
  };
}
