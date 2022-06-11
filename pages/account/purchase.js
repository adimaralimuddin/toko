import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountLayout from "../../components/account/AccountLayout";
import AccountPurchase from "../../components/account/AccountPurchase";

function purchase() {
  return (
    <AccountLayout>
      <AccountPurchase />
    </AccountLayout>
  );
}

export default purchase;

export const getServerSideProps = withPageAuthRequired();
