import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useProduct from "../../controls/productControls";
import CategorySearchFilter from "../category/CategorySearchFilter";
import MainQuerySideBar from "../main/MainQuerySideBar";
import ProductItemCardView from "../ProductItemCardView";
import NoItems from "../loader/NoItems";
import LoaderProductLists from "../loader/LoaderProductLists";

function FilterPage() {
  const router = useRouter();
  const { category } = router.query;
  const { getAllProducts, products, set, loading } = useProduct();

  useEffect(() => {
    if (category) {
      set({ category });
      getAllProducts(category);
    }
  }, [category]);

  return (
    <Container maxWidth="large">
      <Grid container spacing={2}>
        <Grid sx={0} sm={4} md={3} lg={2} item>
          <div className=" min-w-0 sm:block sticky hidden top-[90px] z-50">
            <MainQuerySideBar />
          </div>
        </Grid>
        <Grid sx={10} sm={8} md={9} lg={10} container item spacing={2}>
          <CategorySearchFilter results={products?.length} />
          <Grid item></Grid>
          {loading && <LoaderProductLists />}
          {products?.length == 0 && <NoItems />}
          <Grid spacing={1} container item>
            {products?.map((product) => (
              <ProductItemCardView product={product} key={product?._id} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FilterPage;
