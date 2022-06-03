

import { Grid } from '@mui/material'
import ProductItemCardView from './ProductItemCardView'

function ProductsLists({ products }) {

    return (
        <Grid  container spacing={2} alignItems="stretch">
            {products?.map(
                product => <ProductItemCardView product={product} key={product?._id} />
            )}
        </Grid>
    )
}

export default ProductsLists


