import ProductItemDetailView from "../../components/ProductItemDetailView";
// import Product from "../../models/Product";
// import dbConnect from "../../utils/connectMongoose";

export default ProductItemDetailView;

// export const getStaticPaths = async () => {
//   await dbConnect();
//   const products = await Product.find({});
//   console.log("prods", products);
//   const paths = products?.map((p) => ({ params: { id: String(p._id) } }));
//   console.log("paths", paths);
//   return {
//     paths,
//     // paths: [{ params: { id: "sdfd" } }],
//     fallback: false,
//   };
// };
// export const getStaticProps = async (ctx) => {
//   const id = ctx.params.id;
//   const product = await Product.findById(id);
//   return {
//     props: {
//       product,
//       id,
//     },
//   };
// };
