import { Typography } from "@mui/material";

function ProductPricing({ price, simple, originalPrice }) {
  return (
    <div className={"text-left " + (simple ? "" : " py-3 ")}>
      <Typography
        sx={{ fontWeight: 700 }}
        variant={simple ? "h7" : "h4"}
        color="primary"
      >
        $ {price}
      </Typography>
      <p className="text-sm">
        <span className={" line-through text-gray-400 mr-1"}>
          ${Number.parseFloat((originalPrice / 100) * price + price).toFixed(2)}
        </span>
        <span>-{originalPrice}%</span>
      </p>
    </div>
  );
}

export default ProductPricing;
