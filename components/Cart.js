import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useDispatch, useSelector } from "react-redux";
import QuantityEditor from "./others/QuantityEditor";
import { toggle } from "../redux/cartSlice";
import useCart from "../controls/cartControl";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import PrimaryButton from "./elements/PrimaryButton";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

loadStripe();

function Cart({ user }) {
  const { quantity, total, open } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {
    cart,
    getCarts,
    selectItem,
    deletePayItem,
    getSubTotal,
    incPayItemQnty,
    decPayItemQnty,
    getTransactions,
    selectAllItems,
  } = useCart();

  const [state, setState] = useState(false);
  const router = useRouter();

  const proceedToCheckout = () => {
    setState(false);
    router.push("/checkout");
  };

  useEffect(() => {
    getCarts();
  }, [user]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <>
      <IconButton sx={{ padding: "3px" }} onClick={toggleDrawer(true)}>
        <Badge badgeContent={cart?.length} color="error">
          <LocalMallRoundedIcon fontSize="large" color="primary" />
        </Badge>
      </IconButton>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        <Box
          sx={{ minWidth: 250, maxWidth: 700 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Stack
            direction="row"
            sx={{ padding: "0 10px" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <ClearOutlinedIcon />
            </IconButton>
            <button onClick={getCarts}>test</button>
            <Typography m>My Cart</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <span className="flex items-center">
              <Checkbox onChange={(e) => selectAllItems(e.target.checked)} />
              <Typography variant="body2">
                Select All ({quantity} item(s))
              </Typography>
            </span>
            <span>
              <Button startIcon={<DeleteOutlineOutlinedIcon />}>Delete</Button>
            </span>
          </Stack>
          <Divider />
          <main>
            <List>
              {cart?.map((product) => (
                <ProductItem
                  selectItem={selectItem}
                  deletePayItem={deletePayItem}
                  incPayItemQnty={incPayItemQnty}
                  decPayItemQnty={decPayItemQnty}
                  product={product}
                  key={product?._id}
                />
              ))}
            </List>
          </main>
          <footer>
            <span className="text-gray-600 flex flex-wrap justify-between">
              <Typography variant="body1" mx color="">
                Subtotal ({getTransactions()?.length || 0} item(s)):
                <span className="text-orange-500 ">${getSubTotal()}</span>
              </Typography>
              <Typography variant="body1" mx>
                Shiping fees: ${total}
              </Typography>
            </span>
            <div className="mt-2 flex">
              <PrimaryButton
                disabled={!getTransactions()}
                onClick={proceedToCheckout}
                sx={{ flexGrow: 1, padding: 10 }}
                size="large"
                color="primary"
              >
                Proceed To Checkout
              </PrimaryButton>
            </div>
          </footer>
        </Box>
      </Drawer>
    </>
  );
}

function ProductItem({
  product,
  selectItem,
  deletePayItem,
  incPayItemQnty,
  decPayItemQnty,
  deselect,
}) {
  const onSelectHandler = (e) => {
    const value = e.target.checked;
    selectItem(value, product?._id);
  };

  // console.log(product);

  return (
    <div className="flex border-b py-2 sm:flex-column content-right flex-wrap items-center justify-between hover:bg-gray-100 p-1">
      <div className="flex items-center flex-1 min-w-[60%]">
        <Checkbox
          size="small"
          checked={product?.checked}
          onChange={onSelectHandler}
        />
        <img className="" src={product?.image} width="50" alt="" />
        <Typography ml variant="body2">
          {product?.name}
        </Typography>
      </div>

      <div className="flex flex-wrap">
        <Typography variant="body2" color="primary" mr>
          ${product?.curPrice}
        </Typography>
        <QuantityEditor
          increase={(_) => incPayItemQnty(product?._id)}
          decrease={(_) => decPayItemQnty(product?._id)}
          quantity={product?.quantity}
          simple="true"
        />
        <IconButton sx={{ marginLeft: 1 }}>
          <DeleteOutlineOutlinedIcon
            size="small"
            onClick={(_) => deletePayItem(product?._id)}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default Cart;
