import {
  Badge,
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
import { useSelector } from "react-redux";
import QuantityEditor from "./others/QuantityEditor";
import useCart from "../controls/cartControl";
import useAccount from "../controls/accountControl";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import PrimaryButton from "./elements/PrimaryButton";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

loadStripe();

function Cart({ user }) {
  const { quantity, total } = useSelector((state) => state.cart);
  const {
    set,
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
  const [allAreSelected, setAllAreSelected] = useState(false);
  const router = useRouter();
  const { details } = useAccount();

  const proceedToCheckout = () => {
    setState(false);
    router.push("/checkout");
  };

  useEffect(() => {
    if (user && details) {
      set({ userId: details?._id });
    }
    getCarts();
  }, [user, details]);

  useEffect(() => {
    setAllAreSelected(ifItemsAreChecked());
  }, [cart]);

  if (!user) return null;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const ifItemsAreChecked = () => !cart?.find((c) => c.checked == false);

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
            <Typography m>My Cart</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <span className="flex items-center">
              <Checkbox
                onChange={(e) => selectAllItems(e.target.checked)}
                checked={ifItemsAreChecked()}
                value={allAreSelected}
              />
              <Typography variant="body2">
                Select All ({quantity} item(s))
              </Typography>
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
                Subtotal ({getTransactions()?.length || 0} item
                {getTransactions()?.length > 0 && "s"}):
                <span className="text-orange-500 ">
                  ${getSubTotal()?.toFixed(2)}
                </span>
              </Typography>
              <Typography variant="body1" mx>
                Shiping fees: ${total?.toFixed(2)}
              </Typography>
            </span>
            <div className="mt-2 flex">
              <PrimaryButton
                disabled={!getTransactions()}
                onClick={proceedToCheckout}
                className="w-full text-xl font-semibold"
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
}) {
  const onSelectHandler = (e) => {
    const value = e.target.checked;
    selectItem(value, product?._id);
  };

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
