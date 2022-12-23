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
    <div className="min-h-[300px] bg-gray-200 text-gray-500 mt-10">
      <Container maxWidth="lg" color="primary">
        <Grid container spacing={3} color="primary">
          <Grid item md={3} sm={4} xs={12}>
            <Box>
              <div className="flex  items-center">
                <StoreMallDirectoryIcon
                  sx={{ marginRight: "2px", fontSize: "3em" }}
                  color="primary"
                />
                <Typography
                  sx={{ fontWeight: 600 }}
                  variant="h4"
                  color="primary"
                >
                  TOKO
                </Typography>
              </div>
              <Typography variant="body2" fontColor="primary">
                E-commerce app by adimar
              </Typography>
              <br />
              <Typography variant="h6">FOLLOW US</Typography>

              <div className="flex items-center">
                <FacebookIcon fontSize="large" sx={{ marginRight: 2 }} />
                <TwitterIcon fontSize="large" sx={{ marginRight: 2 }} />
                <InstagramIcon fontSize="large" sx={{ marginRight: 2 }} />
                <PinterestIcon fontSize="large" sx={{ marginRight: 2 }} />
              </div>
            </Box>
          </Grid>
          <Grid item md={2} sm={4} xs={12}>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>FEATURES</Typography>
              <div className="pt-2">
                <p>authentication</p>
                <p>categories</p>
                <p>search & filters</p>
                <p>carts & notifications</p>
                <p>transactions</p>
                <p>user profile/account</p>
                <p>checkouts & payments</p>
              </div>
            </Box>
          </Grid>
          <Grid item md={3} sm={4} xs={12}>
            <Box>
              <Typography color="default" sx={{ fontWeight: 600 }}>
                STACKS
              </Typography>
              <div className="pt-2">
                <p>Next js/react</p>
                <p>Material UI</p>
                <p>Tailwind css</p>
                <p>Redux-toolkit & Zustand</p>
                <p>MongoDb</p>
                <p>Stripe</p>
              </div>
            </Box>
          </Grid>
          {/* <Grid item md={4} sm={12}>
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

      <div className="flex items-center justify-center pt-4 ">
        {["home", "Privacy_Policy", "Terms_of_Use"]?.map((text) => (
          <Link key={text} href={text == "home" ? "/" : text}>
            <p className="px-2 cursor-pointer hover:text-gray-700">
              {text?.replace("_", " ")}
            </p>
          </Link>
        ))}
      </div>
      <div className="text-center pb-5">
        <p>&copy; {new Date().getFullYear()} Toko. All rigths reserved.</p>
      </div>
    </div>
  );
}

export default MainFooter;
