import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import useAccount from "../../controls/accountControl";
import useCart from "../../controls/cartControl";

function MainLayout({ children }) {
  const { user } = useUser();
  const { set } = useCart();
  const { getAccountDetails, details } = useAccount();

  useEffect(() => {
    if (user) {
      getAccountDetails(user?.email);
    }
  }, [user]);

  useEffect(() => {
    if (details) {
      set({ userId: details?._id });
    }
  }, [details]);

  return (
    <div className="bg-slate-50">
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}

export default MainLayout;
