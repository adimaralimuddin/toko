import axios from "axios";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";
import InputSearchBox from "../others/InputSearchBox";
import CategoiesMenus from "../others/CategoiesMenus";
import Cart from "../Cart";
import UserMainMenu from "../others/UserMainMenu";
import PrimaryButton from "../elements/PrimaryButton";
import { useUser } from "@auth0/nextjs-auth0";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

function MainHeader() {
  const { user } = useUser();

  // async function setter() {
  //   axios.post("/api/setter", { type: "ratings" });
  // }
  return (
    <>
      <AppBar position="sticky" color="white" elevation={4}>
        {/* <button onClick={setter}>setter</button> */}
        <div className="max-w-5xl mx-auto w-full">
          <Toolbar>
            <Link href="/">
              <div className="cursor-pointer flex hover:scale-105">
                <StoreMallDirectoryIcon
                  sx={{ marginRight: "2px" }}
                  fontSize="large"
                  color="primary"
                />
                <Typography
                  color="primary"
                  variant="h5"
                  sx={{
                    flexGrow: "x",
                    marginRight: "5px",
                    fontWeight: 600,
                    display: {
                      xs: "none",
                      sm: "block",
                      md: "block",
                      lg: "block",
                    },
                  }}
                >
                  Toko
                </Typography>
              </div>
            </Link>
            <InputSearchBox />
            <Cart user={user} />
            <UserMainMenu user={user}></UserMainMenu>
            {!user && (
              <Link href="/api/auth/login">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginLeft: "5px" }}
                >
                  login
                </Button>
              </Link>
            )}
          </Toolbar>
        </div>
        <CategoiesMenus />
      </AppBar>
    </>
  );
}

export default MainHeader;
