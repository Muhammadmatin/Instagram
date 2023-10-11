import React, { useEffect, useState } from 'react'
import { StoriesPub } from '../stories/StoriesPub'

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { getImage } from '../../images/getImage';
import { axiosRequest } from '../../utils/axiosRequest';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// import { Pagination } from '@mui/material';

const Content = () => {
    const [post, setPost] = useState([])
    const [user, setUser] = useState([])

    async function getData(){
        try {
            const { data } = await axiosRequest.get(`/User/get-users?PageSize=${39}`)
            setUser(data.data)
            console.log(data.data);
        } catch (error) {
            
        }
    }
    async function getPost(){
        try {
            const { data } = await axiosRequest.get(`Post/get-posts?PageSize=${39}`)
            setPost(data.data)
            console.log(data.data);
        } catch (error) {
            
        }
    }

    const userFindById = async(id) =>{
        try {
            const { data } = await axiosRequest.get(`User/get-User-by-id?userId=${id}`)
            return data.data
        } catch (error) {
            
        }
    }

    async function postFindById(id){
        try {
            const { data } = await axiosRequest.get(`User/get-User-by-id?userId=${id}`)
            // console.log(data.data);
        } catch (error) {
            
        }
    }
    // likePost
    async function likePost(id){
        try {
            const { data } = await axiosRequest.post(`Post/like-Post?postId=${id}`)
            getPost()    
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getPost()
        getData()
    },[])

  return (
    post.map((e)=> {
        let thisUser = user.find(element => element.id == e.userId)

        return (
            <div key={e.postId} className="w-[100%] sm:w-[425px] md:w-[470px] flex flex-wrap justify-center  border-b-[1px] border-b-gray-300">
            <div className="w-[100%] flex flex-wrap justify-center">
                <div className="w-[95%] sm:w-[100%] h-[42px] flex justify-between items-center text-[14px]">
                    <div className="w h-[42px] flex justify-start items-center">
                        {/* <StoriesPub img={getImage.avatar}/> */}
                        <StoriesPub img={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`}/>
                        <p className='font-bold ml-[8px]'>{thisUser.userName}</p>
                        <p className='ml-[8px] text-gray-500'>•</p>
                        <p className='ml-[3px] text-gray-500'>18ч</p>
                    </div>
                    <button className='w-[24px] h-[24px] text-gray-500 flex justify-end items-center'>
                        <p>•••</p>
                    </button>
                </div>
    
                <div className="w-[100%] mt-[10px] overflow-hidden flex justify-center items-center rounded-[5px] bg-[black]">
                    {/* <Swiper spacebetween={50} pagination={true} navigation={true} modules={[Pagination, Navigation]}>
                        {
                            e.images.map((imgX, i)=> {
                                return (
                                    <SwiperSlide key={i}>
                                        {
                                            <img src={`${import.meta.env.VITE_APP_FILES_URL}${imgX}`} className='w-[100%]' alt="" />
                                        }
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper> */}
                    <img src={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`} className='w-[100%]' alt="" />
                    {/* <img src={getImage.img} alt="" /> */}
                </div>
            
                <div className="w-[95%] sm:w-[100%] mt-[10px]">
                    <div className="w-[100%] h-[40px] flex justify-between items-center">
                        <div className="w-[100px] flex justify-between items-center">
                            <button onClick={()=>likePost(e.postId)}><FavoriteIcon style={{color: "red", fontSize: "28px"}}/></button>
                            <ModeCommentOutlinedIcon style={{fontSize: "25px"}}/>
                            <NearMeOutlinedIcon style={{fontSize: "25px"}}/>
                        </div>
                        <BookmarkBorderOutlinedIcon style={{fontSize: "25px"}}/>
                    </div>
                    <div className="w-[100%] mt-[5px]">
                        <p className='text-[14px] font-bold'>
                            {e.postLikeCount} отметок "Нравится"
                        </p>
                    </div>
                    <div className="w-[100%] mt-[5px]">
                        <p className='text-[14px]'>
                            <span className='font-bold'>{thisUser.userName} </span> 
                            {e.title}
                        </p>
                    </div>
                    <div className="w-[100%] text-gray-500">
                        <p className='text-[14px]'>{e.content}</p>
                    </div>
                    <div className="w-[100%] font-bold my-[5px]">
                        <p className='text-[14px]'>Показать перевод</p>
                    </div>
                    <div className="w-[100%] text-[14px] text-gray-500">
                        <p className='text-[14px]'>Посмотреть все коментарии ({e.commentCount})</p>
                    </div>
                    <div className="w-[100%] text-[14px] text-gray-500  mt-[5px]">
                        <input type="text" placeholder='Добавьте коментарии' className=''/>
                    </div>
                </div>
            </div>
            </div>
        )
    })      
  )
}

export default Content
