import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from 'next/link'
import Stack from '@mui/material/Stack';


function TransactionItem({ data, cancelOrder, removeItem }) {
    console.log(data)
    return (
        <div className="my-4 p-3 flex flex-wrap justify-between bg-white ">
            <img src={data?.image} width={100} height={100}
                className='mr-1 aspect-square' />

            <Link className="m-2" href={`/products/${data?.productId}`}>
                <div className="flex-1  max-w-[65%] min-w-[60%]">
                    <Typography sx={{ maxHeight: '50px', overflow: 'hidden', }} noWrapd >
                        {data?.description}</Typography>
                    <p className="text-xl font-semibold text-orange-600">${data?.curPrice}</p>
                </div>
            </Link>
            <div className="flex flex-wrap justify-between flex-1">
                <div className="px-2 ">
                    <p className="flex justify-between">
                        <span>
                            Quantity :
                        </span>
                        <span className="text-xl ml-2 font-semibold text-orange-500"> {data?.quantity}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>
                            Order Total :
                        </span>
                        <span className="text-xl ml-2 font-semibold text-orange-500"> ${data?.total}</span>
                    </p>
                </div>
                <div className="px-2">
                    {!data?.canceled &&
                        <Button
                            variant='outlined'
                            color='warning'
                            sx={{ margin: '10px 0' }}
                            onClick={_ => cancelOrder(data?._id)}>Cancel Order</Button>}
                    {data?.canceled &&
                        <Button
                            color='warning'
                            sx={{ margin: '10px 0' }}
                            onClick={_ => removeItem(data?._id)}>Remove</Button>}
                </div>
            </div>
        </div>
    )
}

export default TransactionItem