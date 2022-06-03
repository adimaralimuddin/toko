

import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import useProduct from '../../controls/productControls';
import BannerMain from '../banners/BannerMain';
import ProductCategories from '../banners/ProductCategories';
import ProductCategory from '../banners/ProductCategory';
import ProductsLists from '../ProductsLists';

function ProductPage({ productLists }) {

    const { getAllProducts, products, getMainProduct } = useProduct()

    useEffect(() => {
        // getAllProducts()
        getMainProduct()
    }, [])


    return (
        <Container maxWidth='lg'>
            <BannerMain />
            <ProductCategories />
            <ProductCategory category="device" />
            <ProductsLists products={products} />
        </Container >
    )
}

export default ProductPage

