import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

function AvatarBig(props) {
  const { src, alt, name } = props;
  return (
    <div className="flex items-center p-2 flex-wrapd ">
      <Avatar
        classNamde="min-w-[100px] min-h-[100px] ring-1"
        sx={{ width: 56, height: 56 }}
        src={src}
        alt={alt}
      ></Avatar>
      <Typography ml>{name}</Typography>
    </div>
  );
}

export default AvatarBig;
