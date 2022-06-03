

import { Grid, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useProduct from '../../controls/productControls'
import ProductItemCardView from '../ProductItemCardView'

function ProductCategory({ category }) {

    const { getProductsByCategory } = useProduct()
    const [products, setProducts] = useState()

    const getProducts = async () => {
        const prods = await getProductsByCategory(category)
        setProducts(prods)
        return prods
    }

    useEffect(() => {
        getProducts()
        // getProductsByCategory(category)
    }, [])

    return (
        <div className='p-5 my-5 bg-white shadow-md'>
            <Typography variant='h5' component='h3'>{category}</Typography>

            <Grid container spacing={2} alignItems="stretch" >
                {
                    products?.map(product => <ProductItem product={product} key={product?._id} />)
                }
            </Grid>
        </div>
    )
}

function ProductItem({ product }) {
    return (
        <Grid xs={6} sm={4} md={3} lg={2} item alignItems="stretch" >
            <div className='ring-1d h-full flex flex-col justify-between'>
                <Image src={product?.images?.[0]?.secure_url} width={500}
                    height={500} />
                <Typography variant='body2' >{product?.title}</Typography>
                <Button variant='outlined' color='secondary'>Shop Now</Button>
            </div>
        </Grid>
    )
}

export default ProductCategory