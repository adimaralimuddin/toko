import { Button, Grid, Paper, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from 'next/link'
import Image from "next/image"
import { useState } from "react"
import useProduct from "../../controls/productControls"
import { sampProdCategories } from "./BannerCaption"



function ProductCategories() {
    const [categories, setCategories] = useState(sampProdCategories)
    const { getAllProducts } = useProduct()

    return (
        <div>
            <div>
                <button onClick={getAllProducts}>get prods</button>
            </div>
            <Grid container spacing={2} alignItems="stretch">
                {
                    categories?.map(
                        category => <CategoryItem category={category} key={category?.name || category?.title} />
                    )
                }
            </Grid>
        </div>
    )
}

function CategoryItem({ category }) {
    return (
        <Grid xs={6} sm={4} lg={2} item >
            <div className='flexd flex-col p-3 '>
                <Typography>{category?.title}</Typography>
                <Image src={category?.catImg} width={400} height={200} />
                <Link href={`/filter?category=${category?.name}`}>
                    <button className="ring-1 my-2  px-2 py-1 text-sm  rounded-full font-semibold ring-gray-400 text-gray-700 hover:bg-gray-800 hover:text-gray-100 transition-all" >Shop Now</button>
                </Link>
            </div>
        </Grid>
    )
}

export default ProductCategories