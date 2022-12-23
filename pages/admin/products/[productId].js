import axios from "axios";
import AdminProductDetails from "../../../components/admin/AdminProductDetails";

function productId({ product }) {
  return <AdminProductDetails product={product} />;
}

export default productId;

export async function getServerSideProps({ params: { productId } }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productId}`
  );
  console.log(data);
  return {
    props: {
      product: data,
    },
  };
}
