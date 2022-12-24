import { Typography } from "@mui/material";

function ProductPricing({ price, simple, originalPrice }) {
  return (
    <div className={"text-left " + (simple ? "" : " py-3 ")}>
      <Typography
        sx={{ fontWeight: 500 }}
        className="font-semibold"
        variant={simple ? "h7" : "h4"}
        color="primary"
      >
        $ {price}
      </Typography>
      <small className="text-[.7rem] block">
        <span className={" line-through text-gray-400 mr-1"}>
          ${Number.parseFloat((originalPrice / 100) * price + price).toFixed(2)}
        </span>
        <span className="bg-indigo-100 text-indigo-600 p-[2px] rounded-md font-semibold">
          -{originalPrice}%
        </span>
      </small>
    </div>
  );
}

export default ProductPricing;
