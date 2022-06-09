import { Grid } from "@mui/material";
import Link from "next/link";
import BannerCaption from "./BannerCaption";

function BannerMain() {
  return (
    <div className="bg-white my-3">
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} md={8}>
          <BannerCaption />
        </Grid>
        <Grid container item xs={4} direction="column" spacing={1}>
          <Grid item xs={6}>
            <Link href={`/filter?category=device`}>
              <div className=' bg-center cursor-pointer  hover:ring-1 ring-gray-300 hover:rounded-md transition-all bg-cover bg-no-repeat h-full bg-[url("https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654343790/snapdeal-great-sale-november-2015_jnoek3.jpg")]'></div>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link href={`/filter?category=toy`}>
              <div className=' bg-center cursor-pointer hover:ring-1 ring-gray-300 hover:rounded-md transition-all bg-cover bg-no-repeat h-full bg-[url("https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654343770/c4fa7b04c2626d974569386190633ed2_ntaxov.jpg")]'></div>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default BannerMain;
