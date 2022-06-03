
import { Typography, Grid } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductPricing from './others/ProductPricing'
import ProductRating from './others/ProductRating'

function ProductItemCardView({ product }) {
    // console.log(product)
    return (
        <Link href={`/products/${product?._id}`}>
            <Grid xs={6} sm={4} md={3} lg={2} item>
                <div className='hover:ring-1 h-fulld flexd flex-col justify-between ring-gray-200 cursor-pointer transition-all hover:shadow- hover:-translate-y-1 bg-white'>
                    <div>
                        {product?.onSale && <span className='relative'>
                            <img className='absolute top-0 left-0 -ml-3 z-10' width={70} src="/img/freeShiping.png" alt="" />
                        </span>}
                        <Image src={product?.images?.[0]?.secure_url} width={500}
                            height={500} />
                    </div>

                    <div className='px-2 text-gray-700'>
                        <Typography
                            variant="body1"
                            color='primary'
                            noWrap
                            sx={{ textOverflowd: "ellipsisd", fontWeight: 500 }}
                        >{product?.title}</Typography>
                        <Typography sx={{ textOverflowd: "ellipsisd" }} noWrap variant="body2">{product?.description}</Typography>
                        <ProductPricing price={product?.prices?.[0]} simple='true' />
                    </div>
                    <div className='flex items-center flex-wrap justify-between px-2 text-gray-600'>
                        <ProductRating ratings={product?.ratings} simple='true' />
                        {product?.sold >= 1 && <small>{product?.sold} solds</small>}
                    </div>
                </div>
            </Grid>
        </Link >
    )
}

export default ProductItemCardView