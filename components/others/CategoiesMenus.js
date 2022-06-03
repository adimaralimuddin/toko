
import { useState } from 'react'
import Link from 'next/link'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import { Box, ListItemText, } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const testMenu = [
    {
        name: 'device',
        subs: [
            {
                name: 'jeans'
            },
            {
                name: 'hat'
            },
            {
                name: 'trawsers'
            },
        ]
    }, {
        name: 'clothing',
        subs: [
            {
                name: 'soes',
                subs: [
                    {
                        name: 'adidas',
                        subs: [
                            { name: 'adidas for men' },
                            { name: 'adidas for women' },
                        ]
                    },
                    {
                        name: 'nike',
                    },
                ]
            },
            {
                name: 'shirts'
            },
            {
                name: 'red amazing shirts '
            },
            {
                name: 'shirts for teens'
            },
            {
                name: 'shirts amazing'
            },
        ]
    }, {
        name: 'toys',
        subs: [
            {
                name: 'jeans'
            },
            {
                name: 'hat'
            },
            {
                name: 'trawsers'
            },
        ]
    },
]

function CategoiesMenus() {

    return (
        <Box color='primary' className='bg-green-600d stickyd top-12d'>
            <ul className='flex bg-[#FF6363] items-center justify-center'>
                {
                    testMenu?.map(menu => <Category menu={menu} key={menu?.name} />)
                }
            </ul>
        </Box>
    )
}

function Category({ menu }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className=''>

            <small
                onClick={handleClick}
                className='text-white font-semibold uppercase hover:font-bold cursor-pointer px-2'> {menu?.name} </small>
            <Menu
                sx={{ widht: '100%' }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menu?.subs?.map(sub => <SubCat sub={sub} />)}
            </Menu>
        </div>
    )
}


function SubCat({ sub }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!sub?.subs) {
        return <MenuItem>{sub?.name}</MenuItem>
    }


    return (
        <div>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    {open ?
                        <ArrowDropDownIcon /> :
                        <ArrowDropUpIcon />
                    }
                </ListItemIcon>
                <ListItemText>
                    {sub?.name}
                </ListItemText>
            </MenuItem>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {sub?.subs?.map(sub => <SubCat sub={sub} />)}
            </Menu>
        </div>
    )
}



export default CategoiesMenus