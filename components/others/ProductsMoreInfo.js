import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { Typography } from "@mui/material";
import useAccount from "../../controls/accountControl";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

function ProductsMoreInfo({ product }) {
  const { getAccountDetails, details, fullAddress } = useAccount();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getAccountDetails(user?.email);
    }
  }, [user]);

  return (
    <div className="py-5">
      <div className="flex items-center my-1">
        <LocalShippingIcon color="primary" size="small" />
        <Typography ml variant="body2">
          Shiping to{" "}
          <span className="font-semibold text-gray-500">{fullAddress()}</span>
        </Typography>
      </div>
      <div className="flex items-center my-1">
        <StoreIcon color="text " />
        <Typography ml variant="body2">
          {" "}
          Sold and shipped by <span className="font-semibold">TOKO</span>
        </Typography>
      </div>
      <div className="flex items-center my-1">
        <GppGoodIcon color="primary" />
        <Typography ml variant="body2" color="primary">
          TOKO Guarantee
        </Typography>
      </div>
    </div>
  );
}

export default ProductsMoreInfo;
