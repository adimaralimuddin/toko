import { Typography, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ProductPricing from "./others/ProductPricing";
import ProductRating from "./others/ProductRating";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function ProductItemCardView({ product }) {
  return (
    <Link href={`/products/${product?._id}`}>
      <Grid xs={6} sm={4} md={3} lg={2} item className="ring-1d">
        <div className="shadow-[0_2px_5px_0px_rgba(0,0,0,0.1)] ring-1 h-full flex flex-col justify-between ring-slate-100 cursor-pointer transition-all hover:ring-slate-200  hover:-translate-y-1 bg-white rounded-xl ">
          <div>
            {product?.onSale && (
              <div className="relative">
                <img
                  className="absolute top-0 left-0 -ml-4 z-10"
                  width={50}
                  height={30}
                  src="/img/onSale3.png"
                  alt=""
                />
              </div>
            )}

            {product?.images?.length > 0 && (
              <Image
                className="rounded-t-xl"
                src={product?.images?.[0]?.secure_url || ""}
                alt=""
                width={500}
                height={500}
                objectFit="cover"
              />
            )}
            {product?.sold > 800 && (
              <div className="bg-gradient-to-r text-[.9rem] flex items-center from-pink-500 to-pink-200 text-white px-3 p-[2px] rounded-br-full font-bold">
                <small> Flash Back</small>
              </div>
            )}
          </div>
          <div className="px-2 text-gray-800">
            <Typography
              variant="body2"
              color="#311f52"
              noWrap
              sx={{ textOverflowd: "ellipsisd", fontWeight: 500 }}
            >
              {product?.title}
            </Typography>

            <ProductPricing
              originalPrice={product?.originalPrice}
              price={product?.prices?.[0]}
              simple="true"
            />
          </div>
          {product?.ratings > 4.8 && (
            <div className="p-1 px-2 ">
              <small className=" text-[.7rem] rounded-md bg-green-200 text-green-600 p-[2px] px-2 font-bold">
                Cashback
              </small>
            </div>
          )}
          <div className="flex items-center flex-wrap justify-between px-2 text-gray-600">
            <ProductRating ratings={product?.ratings} simple="true" />
            {product?.sold >= 1 && (
              <p className="text-[.7rem] text-slate-600">
                {product?.sold} sold
              </p>
            )}
          </div>
          <div className="px-2 pb-1 flex gap-3 justify-between items-center">
            {product?.stock >= 1 && (
              <p className="text-[.7rem] text-slate-600">
                {product?.stock} stacks
              </p>
            )}
            <div>
              <LocalShippingIcon fontSize="sm" color="secondary" />
              <small className="text-gray-500 ml-2">
                ${product?.shipingFee}
              </small>
            </div>
          </div>
        </div>
      </Grid>
    </Link>
  );
}

export default ProductItemCardView;
