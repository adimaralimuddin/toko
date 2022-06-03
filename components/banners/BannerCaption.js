import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import { useState } from 'react'


export const sampProdCategories = [
    {
        title: 'Devices',
        name: 'device',
        img: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653827915/iphone_12s_pro_sunset_gold_rose_gold_6_houtgv.jpg',
        catImg: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889329/cover-collection-gadget-and-devices_dmxhd2.png'
    },
    {
        title: "Clothings",
        name: "clothing",
        img: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653830388/Wk17_Secondary_DaytimeDressy_DT_HPBanner_2_2048x_nkbiag.webp',
        catImg: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889572/womens-clothes-set-isolated-female-clothing-collage-accessories-130694655_t2zbb1.jpg'
    },
    {
        title: "Tools",
        name: "tool",
        img: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889326/nainaram-laxmanji-lohar-ghanchiyo-ki-pilani-jalore-hardware-shops-yah1k94z8v_g8pp9l.webp',
        catImg: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889326/nainaram-laxmanji-lohar-ghanchiyo-ki-pilani-jalore-hardware-shops-yah1k94z8v_g8pp9l.webp'
    },
    {
        title: "Furnitures",
        title: "furniture",
        img: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653829972/Best-Clothing-Stores-men_eyhyui.webp',
        catImg: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889321/depositphotos_43066423-stock-illustration-house-furnitures-and-appliances_xq1sub.jpg'
    },
    {
        title: "Foods",
        title: "food",
        img: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889318/Product-of-the-Year-2020_ilgznp.jpg',
        catImg: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889318/Product-of-the-Year-2020_ilgznp.jpg'
    },
    {
        title: "Toys",
        title: "toy",
        img: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653829972/Best-Clothing-Stores-men_eyhyui.webp',
        catImg: 'https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653890029/818buVmsvuL._AC_SX679__srs3bu.jpg'
    },

]

function BannerCaption() {

    const [tabNum, setTabNum] = useState(0)
    const [tabs, setTab] = useState(sampProdCategories)

    const next = () => setTabNum(p => p >= tabs?.length - 1 ? 0 : p += 1)
    const preve = () => setTabNum(p => p <= 0 ? tabs?.length - 1 : p -= 1)
    const image = () => ({ backgroundImage: `url(${tabs?.[tabNum]?.img})` })


    return (
        <div
            style={image()}
            className='flex h-[350px] bg-gray-200 bg-cover bg-center bg-no-repeat '>
            <span className='self-center'>
                <IconButton onClick={preve}>
                    <ArrowBackIosNewIcon fontSize='large' />
                </IconButton>
            </span>
            <div className={`flex-1`}>

            </div>
            <span className='self-center'>
                <IconButton onClick={next}>
                    <ArrowForwardIosIcon fontSize='large' />
                </IconButton>
            </span>
        </div >
    )
}

export default BannerCaption