import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import TransactionPage from "../../components/mainPages/TransactionPage"



function index() {
    return (
        <TransactionPage />
    )
}

export default index

export const getServerSideProps = withPageAuthRequired()