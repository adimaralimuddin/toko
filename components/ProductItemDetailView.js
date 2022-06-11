import ProductQuantityEditor from "./others/ProductQuantityEditor";
import ProductImages from "./ProductImages";
import { useEffect, useState } from "react";
import { Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import ProductRating from "./others/ProductRating";
import ProductPricing from "./others/ProductPricing";
import ProductsLists from "./ProductsLists";
import useCart from "../controls/cartControl";
import useProduct from "../controls/productControls";
import { useRouter } from "next/router";
import ProductExtras from "./others/ProductExtras";
import ProductsMoreInfo from "./others/ProductsMoreInfo";

function ProductItemDetailView() {
  const { getCurrentProduct, curProduct, curPrice, set, loading } = useCart();
  const { getProductsByCategory } = useProduct();
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState();

  useEffect(() => {
    set({ curProduct: null });
    if (!id) return;
    getCurrentProduct(id);
  }, [id]);

  useEffect(() => {
    if (curProduct?.category) {
      getRelatedProducts();
    }
  }, [curProduct]);

  const getRelatedProducts = async () => {
    const p = await getProductsByCategory(curProduct?.category, false);
    setProducts(p);
  };

  if (loading) return <Loader />;

  if (!curProduct) return <NoProduct />;

  return (
    <Container maxWidth="lg" color="white">
      <Grid container spacing={2} color="primary" sx={{ padding: 2 }}>
        <Grid item xs={12} sm={6}>
          <ProductImages images={curProduct?.images} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h4">
            {curProduct?.title}
          </Typography>
          <Typography variant="body1">{curProduct?.description}</Typography>
          <ProductRating
            ratings={curProduct?.ratings}
            sold={curProduct?.sold}
          />
          <hr />
          <ProductPricing
            price={curPrice}
            originalPrice={curProduct?.originalPrice}
          />
          <hr />
          <ProductExtras />
          <ProductQuantityEditor stock={curProduct?.stock} />
          <hr />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Stocks: {curProduct?.stock}</Typography>
            <Typography variant="body2">Sold: {curProduct?.sold}</Typography>
            <Typography variant="body2">
              Category: {curProduct?.category}
            </Typography>
            <Typography variant="body2">: </Typography>
          </Stack>
          <ProductsMoreInfo
            shipingFee={curProduct?.shipingFee}
            onSale={curProduct?.onSale}
          />
        </Grid>
      </Grid>
      <br />
      <Typography>Related Products</Typography>
      <hr />
      <br />
      <ProductsLists products={products} />
    </Container>
  );
}

export default ProductItemDetailView;

function NoProduct() {
  return (
    <div className="max-w-3xl mx-auto text-center h-[60vh] flex items-center justify-center">
      <h1 className="text-xl text-gray-500 font-semibold"> ITEM NOT FOUND!</h1>
    </div>
  );
}

function Loader() {
  return (
    <Container maxWidth="md">
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="box" height={300} sx={{ heigth: "300px" }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <Skeleton variant="box" height={30} />
              <Skeleton variant="text" />
              <br />
              <div className="flex flex-wrap justify-between">
                <Skeleton variant="text" width={"30%"} m />
                <Skeleton variant="text" width={"30%"} m />
                <Skeleton variant="text" width={"30%"} m />
              </div>
              <Skeleton variant="text" />
            </div>
            <div className="flex flex-wrap justify-between">
              <Skeleton variant="box" height={50} width="45%" />
              <Skeleton variant="box" height={50} width="45%" />
            </div>
            <br />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
