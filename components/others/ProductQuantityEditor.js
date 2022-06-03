import { Button, ButtonGroup, Stack, Typography } from "@mui/material"
import useCart from "../../controls/cartControl"
import QuantityEditor from "./QuantityEditor"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function ProductQuantityEditor({ stock }) {

    const { addCart, incQuantity, decQuantity, quantity } = useCart()

    const increase = () => {
        incQuantity()
        // set(p => ({ quantity: p.quantity += 1, total: p?.quantity * p?.price }))
    }
    const decrease = () => {
        decQuantity()
        // if (quantity <= 1) return
        // set(p => ({ quantity: p.quantity -= 1, total: p?.quantity * p?.price }))
    }


    return (
        <div className="my-3 ">
            <span className="flex items-center py-3 ">
                <Typography mr={2} >Quantity</Typography>
                <QuantityEditor increase={increase} decrease={decrease} quantity={quantity} />
                <Typography ml={2} variant='body2' color='text-secondary'  >Stocks: {stock}</Typography>

            </span>
            <Stack sx={{ maxWidth: '500px' }} spacing={1} direction={{ xs: 'column', md: 'row' }}>
                <Button size='large' sx={{ flex: 1, minWidht: '200px', whiteSpace: 'nowrap' }} startIcon={<AddShoppingCartIcon />} onClick={addCart} variant="outlined">Add To Cart</Button>
                <Button size='large' sx={{ flex: 1, minWidht: '200px' }} variant="contained">BUY Now</Button>
            </Stack>
        </div >
    )
}

export default ProductQuantityEditor


