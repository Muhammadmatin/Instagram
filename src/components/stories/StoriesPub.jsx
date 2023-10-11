import React from 'react'
import { getImage } from '../../images/getImage'

const StoriesPub = (obj) => {
  return (
    <div className="w-[42px] h-[42px] rounded-[50%] gradient flex justify-center items-center">
        <div className="w-[38px] h-[38px] rounded-[50%] bg-[white] flex justify-center items-center">
            <img src={obj.img} alt="" className='w-[32px] h-[32px] rounded-[50%]' />
        </div>
    </div>
  )
}

export {StoriesPub}