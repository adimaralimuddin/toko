import { Button, Modal, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

function TransactionItem({ data, cancelOrder, removeItem }) {
  const [open, setOpen] = useState(false);

  const onCancelHandler = () => {
    setOpen(true);
  };

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
            <>
              <Button
                variant="outlined"
                color="warning"
                size="small"
                sx={{ margin: "10px 0" }}
                onClick={onCancelHandler}
              >
                Cancel Order
              </Button>
              <Modal
                open={open}
                onClose={(_) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="p-5 w-full min-h-[200px] flex flex-col text-gray-500 items-center justify-center max-w-sm absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <h2>Are you sure to cancel your order?</h2>
                  <button onClick={(_) => cancelOrder(data?._id)} className="ring-1 ring-orange-600 font-semibold text-lg px-5 py-1 my-2 text-orange-600 hover:bg-orange-600 hover:text-white">
                    Cancel Order
                  </button>
                </div>
              </Modal>
            </>
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
