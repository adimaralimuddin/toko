import Link from "next/link";
import { List } from "@mui/material";

import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

function AccountSideBar() {
  return (
    <div className="sm:flex-row flex-row sm:sticky self-start flex items-center  flex-wrap top-[106px] max-w-[350px] pr-6 ">
      <List className="sm:flex-col gap-3 flex-row flex px-3 flex-wrapd bg-red-400d sm:bg-yellow-500d ring-1d">
        <Link href={`/account`}>
          <div className="flex gap-2 items-center py-1 hover:text-primary cursor-pointer whitespace-nowrap">
            <AccountCircleTwoToneIcon className="text-primary" />
            <p>My Account</p>
          </div>
        </Link>
        <Link href={`/account/purchase`}>
          <div className="flex gap-2 items-center py-1 cursor-pointer whitespace-nowrap hover:text-primary">
            <ShoppingCartTwoToneIcon className="text-primary" />
            <p> My Purchase</p>
          </div>
        </Link>
      </List>
    </div>
  );
}

export default AccountSideBar;
