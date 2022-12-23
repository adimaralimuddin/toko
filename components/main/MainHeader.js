import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import InputSearchBox from "../others/InputSearchBox";
import CategoiesMenus from "../others/CategoiesMenus";
import Cart from "../Cart";
import UserMainMenu from "../others/UserMainMenu";
import { useUser } from "@auth0/nextjs-auth0";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

function MainHeader() {
  const { user } = useUser();

  return (
    <>
      <AppBar position="sticky" color="white" elevation={4}>
        <div className="bg-white -50">
          <div className="bg-indigo-50">
            <div className="flex items-center max-w-6xl m-auto w-full text-slate-400">
              <small>about toky</small>
            </div>
          </div>
          <Toolbar className="max-w-6xl mx-auto w-full p-0 ">
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
                  eBeli
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
