import { Container, Grid, Skeleton } from "@mui/material";
import { useEffect } from "react";
import useProduct from "../../controls/productControls";
import BannerMain from "../banners/BannerMain";
import ProductCategories from "../banners/ProductCategories";
import ProductCategory from "../banners/ProductCategory";
import LoaderBannerMain from "../loader/LoaderBannerMain";
import LoaderProductLists from "../loader/LoaderProductLists";
import ProductsLists from "../ProductsLists";

function ProductPage({ productLists }) {
  const { products, getMainProduct, loading } = useProduct();

  useEffect(() => {
    getMainProduct();
  }, []);

  if (loading) return <LoadingView />;

  return (
    <Container maxWidth="lg">
      <BannerMain />
      <ProductCategories />
      <ProductCategory
        category="device"
        url={
          "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654343790/snapdeal-great-sale-november-2015_jnoek3.jpg"
        }
      />
      <ProductsLists products={products} />
    </Container>
  );
}

export default ProductPage;

function LoadingView() {
  return (
    <Container maxWidth="lg">
      <div className="p-5">
        <LoaderBannerMain />
        <br />
        <LoaderProductLists />
      </div>
    </Container>
  );
}
