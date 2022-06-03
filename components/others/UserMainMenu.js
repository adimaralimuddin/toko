
import { Avatar, Badge, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, } from '@mui/material';
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Logout, ShoppingCartCheckout, Person } from '@mui/icons-material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import useCart from '../../controls/cartControl';

function UserMainMenu({ user, children }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const router = useRouter()
    const { cart } = useCart()

    if (!user) return null;


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toMyPurchase = () => {
        router.push('/account/purchase')
        // setOpen(false)
    }

    const toMyAccount = () => {
        router.push('/account')
        // setOpen(false)
    }

    const toLogout = () => {
        router.push('/api/auth/logout')
        // setOpen(false)
    }

    return (
        <Box >
            <Tooltip title="Account">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 34, height: 34 }} alt={user?.nickname} src={user?.picture} />
                    {/* <PersonOutlineIcon /> */}
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
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={toMyAccount}>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <ListItemIcon>
                            <Badge badgeContent={cart?.length} color="error">
                                <LocalMallIcon color='primary' />
                            </Badge>
                        </ListItemIcon>
                        My Cart
                    </Box>
                </MenuItem>
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
        </Box >
    )
}

export default UserMainMenu


