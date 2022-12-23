import { useEffect, useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Image from "next/image";

function ProductImages({ images }) {
  const [curImage, setCurImage] = useState(images?.[0]);

  useEffect(() => {
    setCurImage(images?.[0]);
  }, [images]);

  return (
    <div className="m-3 in-w-[40%] h-fulld   ">
      <div
        style={{ backgroundImage: `url('${curImage?.secure_url}')` }}
        className={`w-full max-h-[380px] aspect-square bg-center bg-cover bg-no-repeat `}
      ></div>
      <div className="p-1 my-3 flex justify-center items-center">
        {/* <ArrowBackIosRoundedIcon /> */}
        <div className="flex flex-wrap gap-3 justify-center">
          {images?.map((image) => (
            <img
              key={image?.secure_url}
              onMouseEnter={(_) => setCurImage(image)}
              className="ring-1 ring-gray-200 rounded-md cursor-pointer hover:shadow-md"
              src={image?.secure_url}
              width={50}
            />
          ))}
        </div>
        {/* <ArrowForwardIosRoundedIcon /> */}
      </div>
    </div>
  );
}

export default ProductImages;
