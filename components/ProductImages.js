
import { useEffect, useState } from 'react'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

function ProductImages({ images }) {
    const [curImage, setCurImage] = useState(images?.[0])

    useEffect(() => {
        setCurImage(images?.[0])
    }, [images])

    return (
        <div className='m-3 min-w-[40%] flex-1'>
            <div
                style={{ backgroundImage: `url('${curImage?.secure_url}')` }}
                className={`w-full aspect-square bg-center bg-cover bg-no-repeat `}
            >
            </div>
    
            <div className='p-1 my-2 flex justify-between items-center'>
                <ArrowBackIosRoundedIcon />
                <div className='flex flex-wrap'>
                    {
                        images?.map(image => (
                            <img
                                onMouseEnter={_ => setCurImage(image)}
                                className='ring-1 ring-gray-200 rounded-md mx-1'
                                src={image?.secure_url} width={50} />
                        ))
                    }
                </div>
                <ArrowForwardIosRoundedIcon />
            </div>
        </div>
    )
}

export default ProductImages

