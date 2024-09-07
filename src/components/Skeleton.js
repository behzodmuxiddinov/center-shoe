import React from 'react'

const Skeleton = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-[300px] h-[320px] md:w-[280px] md:h-[300px] sm:w-[110px] sm:h-[130px] rounded-md skeleton'></div>
      <div className='w-[90%] sm:w-[70%] h-[50px] sm:h-[30px] rounded-md my-3 skeleton'></div>
      <div className='w-[90%] sm:w-[70%] h-[50px] sm:h-[30px] rounded-md skeleton'></div>
      <div className='w-[90%] sm:w-[70%] h-[50px] sm:h-[30px] rounded-md mt-3 skeleton'></div>
    </div>
  )
}

export default Skeleton