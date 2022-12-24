import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { sampProdCategories } from "./BannerCaption";

function ProductCategories() {
  const [categories, setCategories] = useState(sampProdCategories);

  return (
    <div>
      <Grid container spacing={2} alignItems="stretch">
        {categories?.map((category) => (
          <CategoryItem
            category={category}
            key={category?.name || category?.title}
          />
        ))}
      </Grid>
    </div>
  );
}

function CategoryItem({ category }) {
  return (
    <Grid xs={4} sm={2} md={2} lg={2} item>
      <Link href={`/filter?category=${category?.name}`}>
        <div className="hover:ring-slate-300 bg-white cursor-pointer flex-col p-[5%]d ring-1 ring-slate-200 rounded-xl text-center overflow-hidden ">
          <Typography className="p-1 py-2 ">{category?.title}</Typography>
          <Image src={category?.catImg} width={400} height={200} />
        </div>
      </Link>
    </Grid>
  );
}

export default ProductCategories;
