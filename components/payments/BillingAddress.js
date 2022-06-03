

import { Button, Typography } from '@mui/material'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

function BillingAddress() {
    return (
        <div className=' flex-1 p-5 bg-gray-50 text-gray-600 ring-1 ring-gray-300 '>
            <span className='p-2 '>
                <Typography variant='h7'>Delivery Options</Typography>
            </span>
            <div className='flex items-center p-1 py-2'>
                <FmdGoodOutlinedIcon />
                <Typography mx variant='body2'>Metro City, Quezon City</Typography>
                <Button>Change</Button>
            </div>
            <div className='flex items-center p-1 py-2'>
                <PublicOutlinedIcon />
                <Typography ml variant='body2'>Ships from Overseas</Typography>
            </div>
            <hr />
        </div>
    )
}

export default BillingAddress