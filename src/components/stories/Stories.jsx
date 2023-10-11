import React from 'react'

const Stories = (obj) => {
  return (
    <button className="w-[66px] h-[100%] mr-[10px] flex flex-wrap justify-center content-between">
        <div className="w-[66px] h-[66px] rounded-[50%] gradient flex justify-center items-center">
            <div className="w-[62px] h-[62px] rounded-[50%] bg-[white] flex justify-center items-center">
                <img src={obj.avatar} alt="" className='w-[56px] h-[56px] rounded-[50%]' />
            </div>
        </div>
        <div className="w-[100%] h-[14px] overflow-hidden">
            <p className='text-[13px]'>{obj.nameUser}</p>
            </div>
    </button>
  )
}

export {Stories}
