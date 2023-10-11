import React from 'react'

const ContentExplore = (obj) => {
  return (
    <div className="w-[32%] lg2:w-[317px] h-[240px] sm:h-[317px] flex justify-center items-center bg-[black] overflow-hidden rounded-[2px]">
       <img src={obj.img} className='h-[100%] object-cover' alt="" />
    </div>
  )
}

export default ContentExplore
