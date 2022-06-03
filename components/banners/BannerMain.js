

import { Grid } from '@mui/material'
import BannerCaption from './BannerCaption'

function BannerMain() {
    return (
        <div className='bg-white my-3'>
            <Grid container spacing={1} alignItems="stretch">
                <Grid item xs={12} md={8}>
                    <BannerCaption />
                </Grid>
                <Grid container item xs={4} direction="column" spacing={1}>
                    <Grid item xs={6}>
                        <div className=' bg-center bg-cover bg-no-repeat h-full bg-[url("/img/banner.jpg")]'></div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className=' bg-center bg-cover bg-no-repeat h-full bg-[url("/img/banner.jpg")]'></div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default BannerMain