import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { Logout, ShoppingCartCheckout, Person } from "@mui/icons-material";

function UserMainMenu({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  if (!user) return null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toMyPurchase = () => {
    router.push("/account/purchase");
  };

  const toMyAccount = () => {
    router.push("/account");
  };

  const toLogout = () => {
    router.push("/api/auth/logout");
  };

  return (
    <Box>
      <Tooltip title="Account">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            alt={user?.nickname}
            src={user?.picture}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={toMyAccount}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={toMyPurchase}>
          <ListItemIcon>
            <ShoppingCartCheckout />
          </ListItemIcon>
          My Purchase
        </MenuItem>
        <Divider />
        <MenuItem onClick={toLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMainMenu;
