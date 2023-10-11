import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getImage } from '../../images/getImage';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { axiosRequest } from '../../utils/axiosRequest';
import { getToken } from '../../utils/token';
import { useEffect, useState } from 'react';
import { StoriesPub } from '../stories/StoriesPub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';





function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  // Profil 
  const myid = getToken().sid
    
  const [profile , setProfile] = useState({})
  const [posts , setPosts] = useState([])
  const [saves , setSeves] = useState([])
  const [following , setFollowing] = useState({})
  const [user, setUser] = useState([])
  const [post, setPost] = useState([])

  const navigate = useNavigate()


//  GET Profile
  async function getProfile() {
    try {
      const { data } = await axiosRequest.get(`User/get-User-by-id?userId=${myid}`);
      setProfile(data.data);
    } catch (error) {}
  }

  // GEt Post for my photo
  async function getPosts() {
    try {
      const { data } = await axiosRequest.get("Post/get-posts");
      setPosts(data.data);
    } catch (error) {}
  }

  // Get following 
  async function getFollowing() {
    try {
      const { data } = await axiosRequest.get(`UserProfile/CounterProfile`);
      setFollowing(data.data);
    } catch (error) {}
  }




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

  // Save 
  async function getComment() {
    try {
        const { data } = await axiosRequest.get(`Post/get-PostFavorites`)
        setSeves(data.data)
    } catch (error) {

    }
}

  // open modal comment
  function openModalComment(post, id, user) {
      setModalComment(true)
      setObjPost(post)
      setObjUser(user)
      setIdRender(id)
      // console.log(post.comments);
  }

  // console.log(user);
  // console.log(post);
  useEffect(() => {
      getPost()
      getData()
      getComment()
      
  }, [])


  const [showInfo, setShowInfo] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);

    const handleMouseEnter = () => {
        setShowInfo(true);
    };

    const handleMouseLeave = () => {
        setShowInfo(false);
    };
    
    const handleMouseEnterr = () => {
    setShowInfo2(true);
    };

    const handleMouseLeavee = () => {
    setShowInfo2(false);
    };



    useEffect(() => {
        getProfile();
        getPosts();
        getFollowing();
        addcoment();
        getComment();
        },[value]);
      

return (  
   <div className='w-[100%]'> 

<div className="w-100% h-[100vh] fixed bg-[black] bb">
  {
      modalComment ?
          <div className="w-[100%] h-[100vh] fixed left-0 top-0 flex flex-wrap justify-center items-center aa" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="w-[100%] h-[20px] flex pr-[10px] justify-end items-end text-[white] font-bold">
                  <button  onClick={() => {
                    setModalComment(false)
                    navigate('/basic/profile')

                  }} className='text-[40px] absolute top-5 w-[5%]'>&times;</button>
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
        </div>


    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
          <Tab label={<p className='text-[12px]'>Публикации</p>} {...a11yProps(0)} />
          <Tab label={<p className='text-[12px]'>Сохраненное</p>} {...a11yProps(1)} />
          <Tab label={<p className='text-[12px]'>Отметки</p>} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        
        <div className="w-[100%]  flex flex-wrap gap-[0px]">
            {/* <div className="w-[32%] bg-[black] rounded-[5px] m-[6px] h-[309px] flex justify-center items-center overflow-hidden">
                <img src={getImage.img} className='w-[100%]' alt="" />
            </div> */}
            {/* <div className="w-[32%] bg-[black] rounded-[5px] m-[6px] h-[309px] flex justify-center items-center overflow-hidden">
                <img src={getImage.img2} className='w-[100%]' alt="" />
            </div>
            <div className="w-[32%] bg-[black] rounded-[5px] m-[6px] h-[309px] flex justify-center items-center overflow-hidden">
                <img src={getImage.img3} className='w-[100%]' alt="" />
            </div>
            <div className="w-[32%] bg-[black] rounded-[5px] m-[6px] h-[309px] flex justify-center items-center overflow-hidden">
                <img src={getImage.img} className='w-[100%]' alt="" />
            </div> */}

       
            { posts.map((e)=>{
                if(e.userId == myid){
                  let thisUser = user?.find(element => element?.id == e?.userId)
                  return <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={()=>openModalComment(e,e.postId,thisUser)} className="cont w-[290px] bg-[black] rounded-[5px] cursor-pointer  m-[6px] flex justify-center items-center overflow-hidden">
                      <img  className="w-[100%] h-[309px] zxc cursor-pointer" src={`${import.meta.env.VITE_APP_FILES_URL}${e?.images[0]}`} alt="" />
                      {showInfo && <div className="info w-[100%] h-[309px] text-white"><ModeCommentOutlinedIcon sx={{color:"white"}}/> {e.commentCount} <FavoriteIcon sx={{marginLeft:"10px"}}/> {e.postLikeCount}</div>}

                  </div>
                }
              })  
            }
                
        </div>
        <div className="w-[100%] hidden h-[345px] flex flex-wrap justify-center content-between">
            <div className="w-[100%] flex justify-between">
                <p className='text-[13px] text-[#737373]'>Список сохраненного виден только вам</p>
                <p className='text-[13px] font-bold ml-[8px] text-[#0095f6]'>+ Новая подборка</p>
            </div>
            <div className="w-[350px] flex flex-wrap justify-center text-center">
                <div className="w-[63px] h-[63px] rounded-[50%] border-[2px] flex justify-center items-center">
                    <BookmarkBorderOutlinedIcon style={{fontSize:"40px"}}/>
                </div>
                <p className='w-[100%] text-[35px] font-bold'>Нет публикации</p>
                <p className='text-[14px]'>Сохраняйте фото и видео, которые хотите посмотреть снова. Никто не получит 
                уведомления об этом, а сохраненные объекты сможете видеть только вы.</p>
            </div>
            <div className="w-[100%]"></div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
           <div className='w-[100%]  flex flex-wrap  gap-[0px]'>
                         
            {
              saves.length == 0 ? <div className="div m-[auto]"><div className="w-[100%] flex justify-between ">
                {/* <div className="w-[100%] h-[345px] flex flex-wrap justify-center content-between">
              <p className='text-[13px] text-[#737373]'>Список сохраненного виден только вам</p>
              <p className='text-[13px] font-bold ml-[8px] text-[#0095f6]'>+ Новая подборка</p>
          </div> */}
          <div className="w-[350px] flex flex-wrap justify-center  text-center ">
              <div className="w-[63px] h-[63px] rounded-[50%] border-[2px] flex justify-center items-center">
                  <BookmarkBorderOutlinedIcon style={{fontSize:"40px"}}/>
              </div>
              <p className='w-[100%] text-[35px] font-bold'>Сохранить</p>
              <p className='text-[14px]'>Сохраняйте фото и видео, которые хотите посмотреть снова. Никто не получит 
              уведомления об этом, а сохраненные объекты сможете видеть только вы.</p>
          </div>
          </div>
          </div>: saves.map((e)=>{
            let thisUser = user?.find(element => element?.id == e?.userId)

            return <div  onClick={()=>openModalComment(e,e.postId,thisUser)} key={e.id} className='w-[290px] bg-[black] rounded-[5px] m-[6px] flex justify-center items-center overflow-hidden'>
                    <img   className='h-[309px] zxc cursor-pointer ' src={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`} alt="" />
                    {/* {showInfo2 && <div className="info w-[100%] h-[309px] text-white"><ModeCommentOutlinedIcon sx={{color:"white"}}/> {e.commentCount} <FavoriteIcon/> {e.postLikeCount}</div>} */}

            </div>
          }) 
            }
            </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="w-[100%] h-[345px] flex flex-wrap justify-center content-center">
                <div className="w-[350px] flex flex-wrap justify-center text-center">
                    <div className="w-[63px] h-[63px] rounded-[50%] border-[2px] flex justify-center items-center">
                        <AccountBoxOutlinedIcon style={{fontSize:"40px"}}/>
                    </div>
                    <p className='w-[100%] text-[35px] font-bold'>Фото с вами</p>
                    <p className='text-[14px]'>Здесь показываются люди, отметившие вас на фото.</p>
                </div>
            </div>
      </CustomTabPanel>
    </Box>
    </div>
  );
}