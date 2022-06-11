import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AccountLayout from "../../components/account/AccountLayout";
import AccountMainView from "../../components/account/AccountMainView";

function index() {
  return (
    <AccountLayout>
      <AccountMainView />
    </AccountLayout>
  );
}

export default index;

export const getServerSideProps = withPageAuthRequired();
