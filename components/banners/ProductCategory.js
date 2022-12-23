import { Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import useProduct from "../../controls/productControls";
import Link from "next/link";

function ProductCategory({ category, url }) {
  const { getProductsByCategory } = useProduct();
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const prods = await getProductsByCategory(category, 6);
    setProducts(prods);
    return prods;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className=" my-8 bg-orange-200d bg-whited shadow-lg rounded-xld bg-white">
      {/* <button onClick={getProducts}>test</button> */}
      {/* <Typography variant="h6" component="h4">
        {category?.toUpperCase()}S
      </Typography> */}
      <Grid container spacing={0}>
        <Grid item xs={12} md={7} spacing={0} alignItems="stretch">
          <div
            className=" min-h-[300px] bg-cover h-full bg-center bg-no-repeat flex justify-between items-center "
            style={{ backgroundImage: `url(${url})` }}
          ></div>
        </Grid>
        <Grid
          className="p-2 bg-red-500d "
          container
          item
          xs={12}
          md={5}
          spacing={0}
          alignItems="stretch"
        >
          {products?.slice(0, 6)?.map((product) => (
            <ProductItem product={product} key={product?._id} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

function ProductItem({ product }) {
  return (
    <Grid sx={6} sm={4} md={4} item alignItems="stretch" className="p-1">
      <div className=" flex-1 ring-1d flex flex-col w-full h-full justify-between overflow-hidden  cursor-pointer hover:shadow-md rounded-xl hover:ring-1 ring-slate-200">
        <Image
          src={product?.images?.[0]?.secure_url || ""}
          width={500}
          height={350}
          objectFit="cover"
          className="rounded-t-xl"
        />
        <p className="font-semibold p-2 text-center text-sm">
          {product?.title?.substring(0, 30)}
          {product?.title?.length > 50 && "..."}
        </p>
        {/* <Link href={`/products/${product?._id}`}>
          <Button
            className="rounded-3xl text-sm"
            size="small"
            variant="outlined"
            color="primary"
          >
            Shop Now
          </Button>
        </Link> */}
      </div>
    </Grid>
  );
}

export default ProductCategory;
