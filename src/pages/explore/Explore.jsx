import './Explore.css'
import React, { useEffect, useState } from 'react'
import { getImage } from '../../images/getImage'
import ContentExplore from '../../components/contentExplore/ContentExplore'
import { axiosRequest } from '../../utils/axiosRequest'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { StoriesPub } from '../../components/stories/StoriesPub'
import { getToken } from '../../utils/token';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';


const Explore = () => {

  const myid = getToken().sid

  const [post, setPost] = useState([])
  const [user, setUser] = useState([])

  const [comment, setComment] = useState([])
  const [modalComment, setModalComment] = useState(false)
  const [objPost, setObjPost] = useState({})
  const [objUser, setObjUser] = useState({})
  const [thisPostComment, setThisPostComment] = useState([])

  // const [modalsave,setModalsave] = useState(false)
  const [deletemodal, setDeletemodal] = useState(false)
  const [deletemodal2, setDeletemodal2] = useState(false)
  const [iddelete, setIddelete] = useState(null)

  const [addcom, setAddcom] = useState("")
  const [idRender, setIdRender] = useState(null)

  async function addcoment(postid) {
      try {
          let obj = {
              "comment": addcom,
              "postId": postid
          }
          const { data } = await axiosRequest.post(`Post/add_comment`, obj)
          getPost()
          getComment()
          setAddcom("")
      } catch (error) {

      }
  }
  // deletepost
  async function postdelete(id) {
      try {
          let { data } = await axiosRequest.delete(`Post/delete-post?id=${id}`)
          getPost()
          setDeletemodal(false)
      } catch (error) {

      }
  }
  // get Users
  async function getData() {
      try {
          const { data } = await axiosRequest.get(`/User/get-users?PageSize=${39}`)
          setUser(data.data)
          // console.log(data.data);
      } catch (error) {

      }
  }
  // getpost
  async function getPost() {
      try {
          const { data } = await axiosRequest.get(`Post/get-posts?PageSize=${39}`)
          setPost(data.data.reverse())
          setObjPost(data.data.find((e) => e.postId == idRender))
      } catch (error) {

      }
  }
  // likePost
  async function likePost(id) {
      try {
          const { data } = await axiosRequest.post(`Post/like-Post?postId=${id}`)
          getPost()
      } catch (error) {

      }
  }
  //savepost 
  async function savepost(saveid) {
      try {
          let objsave = {
              "postId": saveid
          }
          const { data } = await axiosRequest.post(`Post/add-PostFavorite`, objsave)
          getPost()
      } catch (error) {

      }
  }

  // getComment
  async function getComment() {
      try {
          const { data } = await axiosRequest.get(`PostComment/get-postcomments?PageSize=300`)
          setComment(data.data)
          // console.log(data.data);
      } catch (error) {

      }
  }

  async function deletecoment(id, logic) {
      if (logic) {
          try {
              let { data } = await axiosRequest.delete(`Post/delete_comment?commentId=${id}`)
              getPost()

          } catch (error) {

          }
      }
  }

  // open modal comment
  function openModalComment(post, id, user) {
      setModalComment(true)
      setObjPost(post)
      setObjUser(user)
      setIdRender(id)
      console.log(post.comments);
  }

  // HOVER
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
};

const handleMouseLeave = () => {
    setShowInfo(false);
};

  console.log(user);
  console.log(post);
  useEffect(() => {
      getPost()
      getData()
      getComment()
      
  }, [])

  return (
    <div className='ml-[0px] md:ml-[70px] lg3:ml-[17.2%] flex justify-center py-[25px]'>

{
      modalComment ?
          <div className="w-[100%] h-[100vh] fixed left-0 top-0 flex flex-wrap justify-center items-center aa" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="w-[100%] h-[20px] flex pr-[10px] justify-end items-end text-[white] font-bold">
                  <button onClick={() => setModalComment(false)} className='text-[40px] absolute top-5 w-[5%]'>&times;</button>
              </div>
              <div className="w-[80%] h-[650px] rounded-[0px] mb-[20px] bg-[white] flex">
                  <div className="w-[100%] h-[100%] overflow-hidden flex justify-center items-center bg-[black]">
                      {/* <img src={`${import.meta.env.VITE_APP_FILES_URL}${objPost.images[0]}`} className='w-[100%]' alt="" /> */}
                      <Swiper spacebetween={50} pagination={true} navigation={true} modules={[Pagination, Navigation]}>
                          {
                              objPost.images.map((elem , i) => {
                                  return (
                                      <SwiperSlide key={i}>
                                          {
                                              <img src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`} className='w-[100%] zxc h-[650px]' alt="" />
                                          }
                                      </SwiperSlide>
                                  )
                              })
                          }
                      </Swiper>
                  </div> 
                  <div className="w-[47%] h-[100%] bg-[rgb(255,255,255)] p-[10px]">
                      <div className="h-[100%] flex flex-wrap justify-center content-start">
                          <div className="w-[100%] sm:w-[100%] h-[60px] flex justify-between items-center text-[14px] border-b-[1px] border-b-gray-300">
                              <div className="w h-[42px] flex justify-start items-center">
                                  <StoriesPub img={`${import.meta.env.VITE_APP_FILES_URL}${objPost.images[0]}`} />
                                  <p className='font-bold ml-[8px]'>{objUser?.userName}</p>
                                  <p className='ml-[8px] text-gray-500'>•</p>
                                  <p className='ml-[3px] text-gray-500'>18ч</p>
                              </div>
                              <button className='w-[24px] h-[24px] text-gray-500 flex justify-end items-center'>
                                  <p>•••</p>
                              </button>
                          </div>
                          <div className="w-[100%] h-[420px] overflow-y-auto border-b-[1px] border-b-gray-300">
                            
                              {
                                  objPost.comments.map((e) => {
                                      let avatar = post.find((d) => d.userId == e.userId)
                                      console.log("avatar", avatar);
                                      return (
                                          <div className="w-[95%] sm:w-[100%] h-[60px] flex justify-between items-center text-[14px">
                                              <div className="w h-[30px] flex justify-start items-center">
                                                  <StoriesPub img={`${import.meta.env.VITE_APP_FILES_URL}${avatar?.images[0]}`} />
                                                  
                                                  <p className='font-bold ml-[8px]'>{user.find((u) => u.id == e.userId).userName}</p>
                                                  <p className='ml-[8px] text-gray-500'>{e.comment}</p>
                                              </div>
                                              <button onClick={() => deletecoment(e.postCommentId, e.userId == myid)} className='w-[24px] h-[24px] text-gray-500 flex justify-end items-center'>
                                                  <p>{e.userId == myid ? "delete" : "•••"}</p>
                                              </button>
                                          </div>
                                      )
                                  })
                              }
                          </div>
                          <div className="w-[100%] h-[40px] flex justify-between items-center">
                              <div className="w-[100px] flex justify-between items-center">
                                  {objPost.postLike ? <button onClick={() => likePost(objPost?.postId)}><FavoriteIcon style={{ color: "red", fontSize: "28px" }} /></button> : <button onClick={() => likePost(objPost?.postId)}><FavoriteBorderIcon style={{ color: "", fontSize: "28px" }} /></button>}
                                  {/* <button onClick={()=>likePost(e?.postId)}><FavoriteIcon style={{color:"red",fontSize: "28px"}}/></button>: <button onClick={()=>likePost(e?.postId)}><FavoriteBorderIcon style={{color:"",fontSize: "28px"}}/></button> */}
                                  {/* <button><FavoriteIcon style={{color: "red", fontSize: "28px"}}/></button> */}
                                  <ModeCommentOutlinedIcon style={{ fontSize: "25px" }} />
                                  <NearMeOutlinedIcon style={{ fontSize: "25px" }} />
                              </div>
                              {objPost.postFavorite == true ? <button onClick={() => savepost(objPost.postId)}>
                                  <TurnedInIcon style={{ fontSize: "25px", }} />
                              </button> :
                                  <button onClick={() => savepost(objPost.postId)}>
                                      <BookmarkBorderIcon style={{ fontSize: "25px" }} />
                                  </button>
                              }
                              {/* <BookmarkBorderOutlinedIcon style={{ fontSize: "25px" }} /> */}
                          </div>
                          <div className="w-[100%] mt-[5px]">
                              <p className='text-[14px] font-bold'>
                                  {objPost.postLikeCount} отметок "Нравится"</p>
                          </div>
                          <div className="w-[100%] h-[50px] flex justify-between items-center text-[14px] text-gray-500  mt-[5px]">
                              <input type="text" value={addcom} onChange={(e) => setAddcom(e.target.value)} placeholder='Добавьте коментарии' className='w-[250px] outline-none text-[black] h-[30px]' />
                              {addcom.trim().length == 0 ?
                                  <button disabled = {true} onClick={() => addcoment(objPost.postId)} className='text-[13px] font-bold ml-[8px] text-[grey]'>Опубликовать</button>
                                  :
                                  <button onClick={() => addcoment(objPost.postId)} className='text-[13px] font-bold ml-[8px] text-[#0095f6]'>Опубликовать</button>
                              }
                          </div>
                      </div>
                  </div>
              </div>
          </div> : ""
  }

      <div className="w-[100%] md:w-[95%] lg2:w-[975px] mt-[30px] md:mt-[0px] flex  flex-wrap gap-[5px] md:gap-[10px]">
        {
          post.map ((e) => {
            let thisUser = user?.find(element => element?.id == e?.userId)
            return (
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={()=>openModalComment(e,e.postId,thisUser)} className="w-[32%] cont lg2:w-[317px] h-[240px] sm:h-[317px] flex justify-center items-center bg-[black] overflow-hidden rounded-[2px] cursor-pointer">
                <img className="w-[100%] h-[317px] zxc " src={`${import.meta.env.VITE_APP_FILES_URL}${e?.images[0]}`} alt="" />
                {showInfo && <div className="info w-[100%] h-[317px] text-white"><ModeCommentOutlinedIcon sx={{color:"white" , fontSize:'35px'}}/> {e.commentCount} <FavoriteIcon sx={{marginLeft:"10px", fontSize:"35px"}}/> {e.postLikeCount}</div>}
                {/* <Swiper spacebetween={50} pagination={true} navigation={true} modules={[Pagination, Navigation]}>
                  {
                    e.images.map((elem , i) => {
                      return (
                       <SwiperSlide key={i}>
                        {
                         <img src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`} className='h-[317px] object-cover' alt="" />
                         }
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper> */}
               </div>
            )
          })
        }

        {/* <img src={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`} className='h-[100%] object-cover' alt="" /> */}
        {/* <ContentExplore video={getImage.benz1}/>
        <ContentExplore video={getImage.benz2}/>
        <ContentExplore video={getImage.benz3}/>
        <ContentExplore img={getImage.img}/>
        <ContentExplore img={getImage.img2}/>
        <ContentExplore img={getImage.img3}/> */}
      </div>
    </div>
  )
}

export default Explore
