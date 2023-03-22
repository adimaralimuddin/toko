import { Container } from "@mui/material";
import { useEffect } from "react";
import useProduct from "../../controls/productControls";
import BannerMain from "../banners/BannerMain";
import ProductCategories from "../banners/ProductCategories";
import ProductCategory from "../banners/ProductCategory";
import LoaderBannerMain from "../loader/LoaderBannerMain";
import LoaderProductLists from "../loader/LoaderProductLists";
import ProductsLists from "../ProductsLists";

function ProductPage({ productLists, products }) {
  const { products: clientProducts, getMainProduct, loading } = useProduct();
  const serverProducts = JSON.parse(products);
  // console.log("prodddd", serverProducts);
  useEffect(() => {
    getMainProduct();
  }, []);

  // if (loading) return <LoadingView />;

  return (
    <div className="max-w-[1200px] mx-auto px-[3%]">
      <BannerMain />
      <ProductCategories />
      <ProductCategory
        category="device"
        url={
          "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654343790/snapdeal-great-sale-november-2015_jnoek3.jpg"
        }
      />
      <ProductsLists products={serverProducts || clientProducts} />
    </div>
  );
}

export default ProductPage;

function LoadingView() {
  return (
    <Container maxWidth="lg">
      <div className="py-5">
        <LoaderBannerMain />
        <br />
        <LoaderProductLists />
      </div>
    </Container>
  );
}
