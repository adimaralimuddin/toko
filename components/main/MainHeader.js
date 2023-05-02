import { useUser } from "@auth0/nextjs-auth0";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Cart from "../Cart";
import CategoiesMenus from "../others/CategoiesMenus";
import InputSearchBox from "../others/InputSearchBox";
import UserMainMenu from "../others/UserMainMenu";

function MainHeader() {
  const { user } = useUser();

  return (
    <>
      <AppBar position="sticky" color="white" elevation={4}>
        <div className="bg-white -50 ring-1">
          <div className="bg-indigo-50">
            {/* <ul className="flex text-[.8rem] items-center justify-betweend gap-4 max-w-6xl m-auto w-full text-slate-500 p-1 px-3">
              <li className="mr-auto">about toky</li>
              <li>Tentang</li>
              <li>Tokopedia</li>
              <li>Mitra</li>
              <li>Tokopedia</li>
              <li> Pusat</li>
            </ul> */}
          </div>
          <Toolbar
            style={{ maxHeight: "40px" }}
            className="max-w-6xl mx-auto w-full py-0 px-6 "
          >
            <Link href="/">
              <div className="cursor-pointer items-center flex hover:scale-105 ">
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
                  toko
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
