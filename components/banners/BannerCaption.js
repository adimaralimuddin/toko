import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { useState } from "react";

export const sampProdCategories = [
  {
    title: "Clothings",
    name: "clothing",
    img: "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654343830/fashion-sale-banners_52683-12048_na1pdo.jpg",
    catImg:
      "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889572/womens-clothes-set-isolated-female-clothing-collage-accessories-130694655_t2zbb1.jpg",
  },
  {
    title: "Devices",
    name: "device",
    img: "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654347114/0103296_DragonMart_categorylisting_computer_electronics_cpfou5.jpg",
    catImg:
      "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889329/cover-collection-gadget-and-devices_dmxhd2.png",
  },
  {
    title: "Tools",
    name: "tool",
    img: "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654345822/construction-tools-banner-design-template_38901-389_3_chwgek.jpg",
    catImg:
      "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889326/nainaram-laxmanji-lohar-ghanchiyo-ki-pilani-jalore-hardware-shops-yah1k94z8v_g8pp9l.webp",
  },
  {
    title: "Furnitures",
    name: "furniture",
    img: "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654346966/furniture-sale-banners-with-photo_23-_ndun8b.jpg",
    catImg:
      "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889321/depositphotos_43066423-stock-illustration-house-furnitures-and-appliances_xq1sub.jpg",
  },
  {
    title: "Foods",
    name: "food",
    img: "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654346583/pngtree-red-food-promotion-banner-png-image_odh2qs.jpg",
    catImg:
      "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653889318/Product-of-the-Year-2020_ilgznp.jpg",
  },
  {
    title: "Toys",
    name: "toy",
    img: "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654346863/banner-lising.jpg.pagespeed.ce_th9stt.jpg",
    catImg:
      "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1653890029/818buVmsvuL._AC_SX679__srs3bu.jpg",
  },
];

function BannerCaption() {
  const [tabNum, setTabNum] = useState(0);
  const [tabs, setTab] = useState(sampProdCategories);

  const next = () => setTabNum((p) => (p >= tabs?.length - 1 ? 0 : (p += 1)));
  const preve = () => setTabNum((p) => (p <= 0 ? tabs?.length - 1 : (p -= 1)));
  const image = () => ({ backgroundImage: `url(${tabs?.[tabNum]?.img})` });

  return (
    <div
      style={image()}
      className="flex h-[280px] bg-gray-200 bg-cover bg-center bg-no-repeat rounded-xl"
    >
      <span className="self-center">
        <IconButton onClick={preve}>
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
      </span>
      <div className={`flex-1`}></div>
      <span className="self-center">
        <IconButton onClick={next}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </span>
    </div>
  );
}

export default BannerCaption;
