
import { Avatar, Button } from '@mui/material'
import React from 'react'

function AvatarBig(props) {
    const { src, alt, name } = props
    return (
        <div className='flex items-center p-2'>
            <Avatar
                sx={{ width: 56, height: 56 }}
                src={src} alt={alt}></Avatar>
            <span className='p-2'>
                <p className='font-semibold'>{name}</p>
                <Button variant='outlined' size='small'>Edit</Button>
            </span>
        </div>
    )
}

export default AvatarBig