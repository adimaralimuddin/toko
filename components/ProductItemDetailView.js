import { Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCart from "../controls/cartControl";
import useProduct from "../controls/productControls";
import ProductImages from "./ProductImages";
import ProductsLists from "./ProductsLists";
import ProductExtras from "./others/ProductExtras";
import ProductPricing from "./others/ProductPricing";
import ProductQuantityEditor from "./others/ProductQuantityEditor";
import ProductRating from "./others/ProductRating";
import ProductsMoreInfo from "./others/ProductsMoreInfo";

function ProductItemDetailView({ product }) {
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
    if (curProduct && curProduct?.category) {
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
        <Grid item xs={12} sm={5}>
          <ProductImages images={curProduct?.images} />
        </Grid>
        <Grid item xs={12} sm={7}>
          <div className="overflow-y-auto h-full max-h-[500px] hide-scroll">
            <Typography
              className="sticky top-0 bg-slate-50 z-10"
              variant="h6"
              component="h4"
            >
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
            <ProductExtras />
            <ProductQuantityEditor stock={curProduct?.stock} />
            <hr />
            <Stack
              className="py-3"
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="body2">
                Stocks: {curProduct?.stock}
              </Typography>
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
            <div></div>
          </div>
        </Grid>
      </Grid>
      <br />
      <Typography variant="h5">Related Products</Typography>
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
          <Skeleton
            className="rounded-lg"
            variant="box"
            height={300}
            sx={{ heigth: "300px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <Skeleton className="rounded-lg" variant="box" height={30} />
              <Skeleton className="rounded-lg" variant="text" />
              <Skeleton className="rounded-lg" variant="text" width="40%" />
              <Skeleton className="rounded-lg" variant="text" width="60%" />
              <br />
              <div className="flex flex-wrap justify-between">
                <Skeleton className="rounded-lg" variant="text" width={"30%"} />
                <Skeleton className="rounded-lg" variant="text" width={"30%"} />
                <Skeleton className="rounded-lg" variant="text" width={"30%"} />
              </div>
              <Skeleton className="rounded-lg" variant="text" />
            </div>
            <div className="flex flex-wrap justify-between">
              <Skeleton
                className="rounded-lg"
                variant="box"
                height={40}
                width="45%"
              />
              <Skeleton
                className="rounded-lg"
                variant="box"
                height={40}
                width="45%"
              />
            </div>
            <div className="flex flex-wrap justify-between">
              <Skeleton width="30%" className="rounded-lg" variant="text" />
              <Skeleton width="30%" className="rounded-lg" variant="text" />
              <Skeleton width="30%" className="rounded-lg" variant="text" />
            </div>

            {/* <br /> */}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
