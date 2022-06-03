import { Container, Grid, Stack } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useProduct from "../../controls/productControls"
import CategorySearchFilter from "../category/CategorySearchFilter"
import MainQuerySideBar from "../main/MainQuerySideBar"
import ProductItemCardView from "../ProductItemCardView"



function FilterPage() {
    const router = useRouter()
    const { category } = router.query
    const { getAllProducts, products, set } = useProduct()

    useEffect(() => {
        if (category) {
            set({ category })
            getAllProducts(category)
        }
    }, [category])

    return (
        <Container maxWidth='large'>
            <Grid container spacing={2}>
                <Grid sx={0} sm={4} md={3} lg={2} item>
                    <div className=' min-w-0 sm:block hidden sticky top-[90px]'>
                        <MainQuerySideBar />
                    </div>
                </Grid>
                <Grid sx={10} sm={8} md={9} lg={10} container item spacing={2}>
                    <CategorySearchFilter results={products?.length} />
                    <Grid item></Grid>
                    <Grid spacing={1} container item >
                        {products?.map(
                            product => <ProductItemCardView product={product} key={product?._id} />
                        )}
                    </Grid>
                </Grid>
            </Grid>


        </Container>
    )
}

export default FilterPage

