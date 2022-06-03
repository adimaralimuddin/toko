import axios from "axios"
import AdminProductDetails from "../../../components/admin/AdminProductDetails";



function productId({ product }) {
    return <AdminProductDetails product={product} />
}

export default productId

export async function getServerSideProps({ params: { productId } }) {
    const { data } = await axios.get(`http://localhost:3000/api/products/${productId}`)
    console.log(data);
    return {
        props: {
            product: data
        }
    }
}