import React from 'react'
import { getImage } from '../../images/getImage'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const Reels = () => {
  return (
    <div className='ml-[0px] md:ml-[70px] lg3:ml-[17.2%] flex justify-center py-[25px]'>
        <div className="w-[418px]">
        <div className="w-[418px] h-[700px] my-[20px] flex ml-[50px]">
            <div className="w-[369px] h-[100%] bg-[black] overflow-hidden flex justify-center items-center">
                <video  muted autoPlay loop src={getImage.benz1} className='w-[100%]'></video>
            </div>
            <div className="w-[50px] h-[100%] text-[13px] flex flex-wrap justify-center content-end text-center">
                <FavoriteBorderOutlinedIcon style={{color: "", fontSize: "28px"}}/>
                <div className="w-[100%] mb-[10px]">
                    <p>12 тыс.</p>
                </div>
                <ModeCommentOutlinedIcon style={{fontSize: "25px"}}/>
                <div className="w-[100%] mb-[10px]">
                    <p>10</p>
                </div>
                <NearMeOutlinedIcon style={{fontSize: "25px"}}/>
                <div className="w-[100%] mb-[10px]"></div>
                <BookmarkBorderOutlinedIcon style={{fontSize: "25px"}}/>
                <div className="w-[100%] mb-[10px]"></div>
                <button className='w-[24px] h-[24px] text-gray-500 flex justify-end items-center'>
                    <p>•••</p>
                </button>
            </div>
        </div>
        <div className="w-[418px] h-[700px] my-[20px] flex ml-[50px]">
            <div className="w-[369px] h-[100%] bg-[black] overflow-hidden flex justify-center items-center">
                <video  muted autoPlay loop src={getImage.benz2} className='w-[100%]'></video>
            </div>
            <div className="w-[50px] h-[100%] text-[13px] flex flex-wrap justify-center content-end text-center">
                <FavoriteBorderOutlinedIcon style={{color: "", fontSize: "28px"}}/>
                <div className="w-[100%] mb-[10px]">
                    <p>12 тыс.</p>
                </div>
                <ModeCommentOutlinedIcon style={{fontSize: "25px"}}/>
                <div className="w-[100%] mb-[10px]">
                    <p>10</p>
                </div>
                <NearMeOutlinedIcon style={{fontSize: "25px"}}/>
                <div className="w-[100%] mb-[10px]"></div>
                <BookmarkBorderOutlinedIcon style={{fontSize: "25px"}}/>
                <div className="w-[100%] mb-[10px]"></div>
                <button className='w-[24px] h-[24px] text-gray-500 flex justify-end items-center'>
                    <p>•••</p>
                </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Reels
