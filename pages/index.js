import ProductPage from "../components/mainPages/ProductPage";
import Product from "../models/Product";
import dbConnect from "../utils/connectMongoose";

export default ProductPage;

export const getStaticProps = async () => {
  await dbConnect();
  const products = await Product.find().select("-createdAt -updatedAt  ");

  const finalProducts = products?.map((p) => {
    p.images = [p.images?.[0]];
    return p;
  });
  // console.log("products", finalProducts);
  console.log("p1 ", products?.[0]?.images);
  return {
    props: { products: JSON.stringify(finalProducts) },
  };
};
