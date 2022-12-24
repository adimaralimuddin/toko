import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
} from "@mui/material";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

import Link from "next/link";

function MainFooter() {
  return (
    <div className=" flex flex-col min-h-[300px] bg-gray-200 text-gray-500 pt-8 mt-8">
      <Container className="flex-1" maxWidth="lg" color="primary">
        <Grid container spacing={3} color="primary" className="">
          <Grid item md={3} sm={4} xs={12}>
            <Box>
              <div className="flex  items-center">
                <StoreMallDirectoryIcon
                  sx={{ marginRight: "2px", fontSize: "2em" }}
                  color="primary"
                />
                <Typography
                  sx={{ fontWeight: 600 }}
                  variant="h5"
                  color="primary"
                >
                  TOKO
                </Typography>
              </div>
              <Typography variant="body2" fontColor="primary">
                E-commerce app by adimar
              </Typography>
              <Typography
                className="mt-3"
                variant="subtitle2"
                sx={{ fontWeight: 600 }}
              >
                FOLLOW US
              </Typography>
              <div className="flex items-center ">
                <FacebookIcon fontSize="medium" sx={{ marginRight: 2 }} />
                <TwitterIcon fontSize="medium" sx={{ marginRight: 2 }} />
                <InstagramIcon fontSize="medium" sx={{ marginRight: 2 }} />
                <PinterestIcon fontSize="medium" sx={{ marginRight: 2 }} />
              </div>
            </Box>
          </Grid>
          <Grid item md={4} sm={4} xs={12} className="ring-1d">
            <Grid className="ring-1d">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                FEATURES
              </Typography>
              <Grid container spacing={3} className="text-[.9rem]">
                <Grid item>
                  <div className="pt-2 ring-1d">
                    <p>authentication</p>
                    <p>categories</p>
                    <p>search & filters</p>
                    <p>search</p>
                  </div>
                </Grid>
                <Grid item>
                  <div className="pt-2 ring-1d">
                    <p>carts & notifications</p>
                    <p>transactions</p>
                    <p>user profile/account</p>
                    <p>checkouts & payments</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={4} xs={12} className="ring-1d">
            <Grid className="ring-1d">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                STACKS
              </Typography>
              <Grid container spacing={3} className="text-[.9rem]">
                <Grid item>
                  <div className="pt-2 ring-1d">
                    <p>Next js/react</p>
                    <p>Material UI</p>
                    <p>Tailwind css</p>
                  </div>
                </Grid>
                <Grid item>
                  <div className="pt-2 ring-1d">
                    <p>Redux-toolkit & Zustand</p>
                    <p>MongoDb</p>
                    <p>Stripe</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item md={3} sm={12}>
            <Stack
              direction="row"
              sx={{ flexGrow: 1, maxWidth: "500px", marginX: "auto" }}
            >
              <TextField
                type="text"
                placeholder="your email here..."
                sx={{ flexGrow: 1 }}
              ></TextField>
              <Button variant="outlined">SIGNUP</Button>
            </Stack>
          </Grid> */}
        </Grid>
      </Container>

      <div className="flex text-[.8rem] items-center justify-center pt-4 ">
        {["home", "privacy policy", "terms of use"]?.map((text) => (
          <Link key={text} href={text == "home" ? "/" : "#"}>
            <p className="px-2 cursor-pointer hover:text-gray-700">
              {text?.toUpperCase()}
            </p>
          </Link>
        ))}
      </div>
      <div className="text-center pb-4">
        <p>&copy; {new Date().getFullYear()} Toko. All rigths reserved.</p>
      </div>
    </div>
  );
}

export default MainFooter;
