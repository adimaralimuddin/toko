

import { Button } from '@mui/material'

function PrimaryButton(props) {
    return (
        <Button
            sx={{ flex: 1 }}
            color='primary' variant='outlined'
            className='px-2 py-1 bg-green-600d text-whited m-1'
            {...props}
        >
            {props?.children}</Button>
    )
}

export default PrimaryButton



