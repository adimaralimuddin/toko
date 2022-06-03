
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { Button, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import AvatarBig from '../elements/AvatarBig'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

function AccountSideBar() {
    const { user } = useUser()
    return (
        <div className='sticky top-[90px] max-w-[200px] bg-white h-ful ring-1'>
            <AvatarBig src={user?.picture} name={user?.nickname} />
            <hr />
            <List>
                <Link href={`/account`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText>My Account</ListItemText>
                    </ListItemButton>
                </Link>
                <Link href={`/account/purchase`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingCartCheckoutIcon />
                        </ListItemIcon>
                        <ListItemText>My Purchase</ListItemText>
                    </ListItemButton>
                </Link>
            </List>
        </div >
    )
}

export default AccountSideBar