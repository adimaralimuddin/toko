import { Button, Modal, Stack, Typography } from "@mui/material";
import useCart from "../../controls/cartControl";
import QuantityEditor from "./QuantityEditor";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PrimaryButton from "../elements/PrimaryButton";
import { useUser } from "@auth0/nextjs-auth0";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAccount from "../../controls/accountControl";

function ProductQuantityEditor({ stock }) {
  const { user } = useUser();
  const { addCart, incQuantity, decQuantity, quantity, set, userId } =
    useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { details } = useAccount();

  const increase = () => incQuantity();
  const decrease = () => decQuantity();

  useEffect(() => {
    if (user) {
      set({ userId: details?._id });
    }
  }, [user]);

  const onAddToCartHandler = () => {
    if (user) {
      addCart();
    } else {
      setOpen(true);
    }
  };

  const onBuyNowHandler = async () => {
    if (user) {
     
      await addCart(true);
      router.push("/checkout");
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="my-3 ">
      <span className="flex items-center py-3 ">
        <Typography mr={2}>Quantity</Typography>
        <QuantityEditor
          increase={increase}
          decrease={decrease}
          quantity={quantity}
        />
        <Typography ml={2} variant="body2" color="text-secondary">
          Stocks: {stock}
        </Typography>
      </span>
      <Stack
        sx={{ maxWidth: "500px" }}
        spacing={1}
        direction={{ xs: "column", md: "row" }}
      >
        <Button
          size="large"
          sx={{ flex: 1, minWidht: "200px", whiteSpace: "nowrap" }}
          startIcon={<AddShoppingCartIcon />}
          onClick={onAddToCartHandler}
          variant="outlined"
        >
          Add To Cart
        </Button>
        <PrimaryButton onClick={onBuyNowHandler} className="flex-1">
          BUY NOW
        </PrimaryButton>
      </Stack>
      <UserLoginModal handleClose={(_) => setOpen(false)} open={open} />
    </div>
  );
}

export default ProductQuantityEditor;

function UserLoginModal({ handleClose, open }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    textAlign: "center",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="body1"
          component="h2"
        >
          Login To Your TOKO Account!
        </Typography>
        <br />
        <Link href="/api/auth/login">
          <PrimaryButton className="w-full">LOGIN</PrimaryButton>
        </Link>
      </Box>
    </Modal>
  );
}
