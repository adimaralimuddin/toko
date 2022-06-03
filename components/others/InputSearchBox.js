

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Link from 'next/link'
import { useProduct } from '../../redux/productSlice';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Container, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';

function InputSearchBox() {
    const { title, searchItems, category,
        searchItem, getSearchItem, setTitle,
        searching, setCategory,
        isOpenSearchItems, setOpenSearchItems,
    } = useProduct()



    return (
        <Box sx={{ flexGrow: 1, minWidth: '100px',  }} >
            <div className=' max-w-[600px] bg-[#FF6363] p-[2px] mx-auto min-w-[50px]  flex flex-1 h-[40px] rounded-md'>
                <button onClick={getSearchItem} className='bg-[#FF6363] px-1 text-white text-center justify-center items-center flex w-[40px] '>
                    <SearchRoundedIcon fontSize='medium' />
                </button>
                <input
                    value={title}
                    onInput={e => {
                        searchItem(e.target.value);
                    }}
                    onBlur={_ => {
                        setTimeout(() => {
                            setOpenSearchItems(false)
                        }, 500);
                    }}
                    onClick={_ => setOpenSearchItems(true)}
                    style={{ border: 'none' }}
                    className=' px-2 bg-gray-200 min-w-[50px] outline-0 flex-1 ring-0 rounded-md ' type="text" autoComplete='off' placeholder='Search ' />
            </div>

            {isOpenSearchItems &&
                <Container maxWidth='large' className='bg-white absolute top-[65px] shadow-md left-0 w-full   min-h-[200px] z-[9999]'>
                    <Box className='p-3 flex justify-between max-w-5xl mx-auto'>
                        <Typography color='primary'>Result for :"{title}" ({searchItems?.length}) item(s) found</Typography>
                        <Button onClick={_ => setOpenSearchItems(false)} size='small' className='hover:ring-orange-500 hover:ring-1 rounded-md'>Close</Button>
                    </Box>
                    <Box className='max-w-5xl mx-auto max-h-[70vh] overflow-y-auto'>
                        {
                            searchItems?.map(
                                item => <SearchedItem
                                    item={item}
                                    setOpenSearchItems={setOpenSearchItems}
                                    key={item?._id} />)
                        }
                    </Box>
                </Container>}
        </Box>
    )
}

function SearchedItem({ item, setOpenSearchItems }) {
    const router = useRouter()
    console.log(item)
    const onClickHandler = () => {
        setOpenSearchItems(false)
        router.push(`/products/${item?._id}`)
    }

    return (
        <ListItem disablePadding onClick={onClickHandler} className='flex justify-between items-center p-1 px-3 hover:bg-gray-100 cursor-pointer'>
            <span className='flex-1 flex items-center'>
                {/* <img src={item?.images?.[0]?.secure_url} width='35' height='35' alt="" className='mx-1 min-w-[35px]' /> */}
                <p>{item?.title}</p>
            </span>

            <p>{item?.curPrice}</p>
        </ListItem>
    )
}

export default InputSearchBox

