import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import Stack from "@mui/material/Stack";

function TransactionItem({ data, cancelOrder, removeItem }) {
  return (
    <div className="my-4 p-3 ring-1 ring-gray-200 flex flex-wrap flex-col justify-between bg-white text-gray-500">
      <Link className="m-2" href={`/products/${data?.productId}`}>
        <div className="flex ">
          <img
            src={data?.image}
            width={100}
            height={100}
            className="mr-2 aspect-square ring-1 ring-gray-300 rounded-md"
          />
          <Typography sx={{ maxHeight: "50px", overflow: "hidden" }} noWrapd>
            {data?.name?.substring(0, 150) ||
              data?.discription?.substring(0, 150)}
          </Typography>
        </div>
      </Link>
      <hr className="mt-3" />
      <div className="flex flex-wrap justify-between flex-1 mt-2">
        <div className="px-2 ">
          <small className="flex justify-betweend">
            <span>Price :</span>
            <span className="text-md ml-2 font-semibold text-orange-500">
              {" "}
              {data?.curPrice}
            </span>
          </small>
          <small className="flex justify-betweend">
            <span>Quantity :</span>
            <span className="text-md ml-2 font-semibold text-orange-500">
              {" "}
              {data?.quantity}
            </span>
          </small>
          <small className="flex justify-between">
            <span>Order Total :</span>
            <span className="text-md ml-2 font-semibold text-orange-500">
              {" "}
              ${data?.total}
            </span>
          </small>
        </div>

        <div className="px-2">
          {!data?.canceled && (
            <Button
              variant="outlined"
              color="warning"
              size="small"
              sx={{ margin: "10px 0" }}
              onClick={(_) => cancelOrder(data?._id)}
            >
              Cancel Order
            </Button>
          )}
          {data?.canceled && (
            <Button
              color="warning"
              size="small"
              sx={{ margin: "10px 0" }}
              onClick={(_) => removeItem(data?._id)}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
