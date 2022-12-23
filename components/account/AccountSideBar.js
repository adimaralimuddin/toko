import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Box, List, Typography } from "@mui/material";
import AvatarBig from "../elements/AvatarBig";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function AccountSideBar() {
  const { user } = useUser();
  return (
    <div
      className="sm:flex-col flex-row sm:sticky self-start flex items-center flex-wrap top-[106px] max-w-[350px] bg-whited py-2 flex-[2] "
      sx={{
        display: { sm: "block", xs: "flex" },
        flexDirection: { sm: "row" },
      }}
    >
      <AvatarBig src={user?.picture} dname={user?.nickname} />
      <Typography variant="h6">{user?.nickname}</Typography>
      <hr />
      <List className="sm:flex-col gap-3 flex-row flex px-3 flex-wrap">
        <Link href={`/account`}>
          <div className="flex gap-2 items-center py-1 hover:text-black cursor-pointer whitespace-nowrap">
            <AccountBoxIcon className="text-primary" />
            <p>My Account</p>
          </div>
        </Link>
        <Link href={`/account/purchase`}>
          <div className="flex gap-2 items-center py-1 cursor-pointer whitespace-nowrap">
            <ShoppingCartCheckoutIcon className="text-primary" />
            <p> My Purchase</p>
          </div>
        </Link>
      </List>
    </div>
  );
}

export default AccountSideBar;
