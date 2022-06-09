import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function AvatarBig(props) {
  const { src, alt, name } = props;
  return (
    <div
     
      className="flex items-center p-2 flex-wrapd "
    >
      <Avatar sx={{ width: 56, height: 56 }} src={src} alt={alt}></Avatar>
      <Typography ml>{name}</Typography>
    </div>
  );
}

export default AvatarBig;
