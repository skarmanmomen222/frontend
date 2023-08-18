import React from 'react'
import Rating from '@mui/material/Rating';
const ReviewCard = ({ review }) => {
    const [value, setValue] = React.useState(review.rating);
    return (
        <div className='w-[400px] px-20    py-10'>
         
              <div className='flex justify-center items-center  shadow-lg   text-center    px-16 py-3'>
                    <div className='flex flex-col  items-center  justify-center'>
                        <div className='w-[100px] h-[100px]'>
                            <img className='rounded-full w-full  ' src="https://cdn.vectorstock.com/i/preview-1x/43/39/admin-support-red-flat-design-long-shadow-glyph-vector-39924339.jpg" alt="" />
                        </div>
                        <div>
                            <p>
                                {review.name}
                            </p>
                        </div>
                        <Rating name="size-small" defaultValue={value} onChange={(event, newValue) => {
                            setValue(newValue);
                        }} size="small" />
                        
                        <p className='whitespace-nowrap'>{review.comment}</p>
                    </div>
                </div>
        



        </div>
    )
}

export default ReviewCard
