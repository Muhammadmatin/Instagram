
import React, { useEffect, useState } from 'react'
import '../pages.css'
import { getImage } from '../../images/getImage'
import { StoriesPub } from '../../components/stories/StoriesPub'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { axiosRequest } from '../../utils/axiosRequest';
import Content from '../../components/content/Content';
import './Home.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { getToken } from '../../utils/token';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IMG from "../../images/icon/avatar.jpeg"

const Home = () => {
    const myid = getToken().sid

    const [post, setPost] = useState([])
    const [user, setUser] = useState([])
    const [Modalstory, setModalstory] = useState(false)

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

    const [storyid, setStoryid] = useState(null)
    const [photo, setPhoto] = useState("")

    // add story
    const [content, setContent] = useState("")

    async function addstory() {
        try {
            let formData = new FormData()
            // formData.append("postId", storyid)
            formData.append("Image", photo)
            const { data } = await axiosRequest.post(`Story/AddStories`, formData)
            setStoryid(null)
            getstories()
            setModalstory(false)

        } catch (error) {

        }
    }




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
    }


    const [modalka, setModalka] = useState(false)
    const [story, setStory] = useState([])  

    async function getStories(id) {
        try {
            let { data } = await axiosRequest.get(`Story/GetStoryById?=${id}}`)
            setStory(data.data)
            // console.log(data.data);
        } catch (error) {

        }
    }


    useEffect(() => {
        getPost()
        getData()
        getComment()
        getStories()
    }, [])



    return (
        <div className=' ml-[0px] md:ml-[70px] lg3:ml-[17.2%] py-[40px] flex  justify-center items-start'>
            {
                modalComment ?
                    <div className="w-[100%] h-[100vh] fixed left-0 top-0 flex flex-wrap justify-center items-center aa" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <div className="w-[100%] h-[20px] flex pr-[10px] justify-end items-end text-[white] font-bold">
                            <button onClick={() => setModalComment(false)} className='text-[40px] absolute top-5 w-[5%]'>&times;</button>
                        </div>
                        <div className="w-[80%] h-[750px] rounded-[0px] mb-[20px] bg-[white] flex">
                            <div className="w-[53%] h-[90%] overflow-hidden flex justify-center items-center bg-[black]">
                                <img src={`${import.meta.env.VITE_APP_FILES_URL}${objPost.images[0]}`} className='w-[100%]' alt="" />
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
                                            {objUser.id == myid?<p onClick={()=>{setDeletemodal(true),setModalComment(false)}}>•••</p>
                                            :<p onClick={()=>{setDeletemodal2(true),setModalComment(false)}}>•••</p>}
                                            
                                        </button>
                                    </div>
                                    <div className="w-[100%] h-[420px] overflow-y-auto border-b-[1px] border-b-gray-300">
                                        {
                                            objPost.comments.map((e) => {
                                                let avatar = post.find((d) => d.userId == e.userId)
                                                return (
                                                    <div className="w-[95%] sm:w-[100%] h-[60px] flex justify-between items-center text-[14px">
                                                        <div className="w h-[30px] flex justify-start items-center">
                                                            <StoriesPub img={`${import.meta.env.VITE_APP_FILES_URL}${avatar?.images[0]}`} />
                                                            <p className='font-bold ml-[8px]'>{user.find((u) => u.id == e.userId)?.userName}</p>
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
                                            <button disabled={true} onClick={() => addcoment(objPost.postId)} className='text-[13px] font-bold ml-[8px] text-[grey]'>Опубликовать</button>
                                            :
                                            <button onClick={() => addcoment(objPost.postId)} className='text-[13px] font-bold ml-[8px] text-[#0095f6]'>Опубликовать</button>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            <div className="w-[630px] mt-[15px] md:mt-[0px] flex flex-wrap justify-center content-start">
                <div className="stories w-[95%] sm:w-[100%] h-[90px] flex mb-[15px] sm:mb-[20px]">





                    <button className="w-[66px] h-[100%] mr-[10px] flex flex-wrap justify-center content-between" onClick={() => setModalstory(true)}>
                        <div className="w-[66px] h-[66px] rounded-[50%] gradient flex justify-center items-center">
                            <div className="w-[62px] h-[62px] rounded-[50%] bg-[white] dark:bg-[black] flex justify-center items-center">
                                <AddCircleOutlineIcon style={{ fontSize: "50px" }} />
                            </div>
                        </div>
                        <div className="w-[100%] h-[20px] overflow-hidden">
                            <p className='text-[13px]'>Добавить</p>
                        </div>
                    </button>


                    <div className="div w-[90%]">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={0}

                            breakpoints={{

                                340: {
                                    slidesPerView: 6,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 6,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }}
                            modules={[]}
                            className="pb-[5%]"
                        >

                            {
                                 user.map((e) => {
                                    return <SwiperSlide key={e.id} onClick={()=> {getStories(e.id),setModalka(true)}} className='hover:cursor-pointer'>
                                        <img src={`${import.meta.env.VITE_APP_FILES_URL}${e.avatar}`} width={60} className='h-[10vh] m-auto rounded-[50%]' />
                                        <h1 className='text-center pt-[1%]'>{e.userName}</h1>

                                    </SwiperSlide>

                                })
                            }

                        </Swiper>
                    </div>


                </div>
                {
                    post.map((e) => {
                        let thisUser = user?.find(element => element?.id == e?.userId)
                        return (
                            <div key={e.postId} className="w-[100%] ab sm:w-[425px] md:w-[470px] flex flex-wrap py-[20px] justify-center  border-b-[1px] border-b-gray-300 index">
                                <div className="w-[100%] flex flex-wrap justify-center">
                                    <div className="w-[95%] sm:w-[100%] h-[42px] flex justify-between items-center text-[14px]">
                                        <div className="w h-[42px] flex justify-start items-center">
                                            {/* <StoriesPub img={getImage.avatar}/> */}
                                            <StoriesPub img={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`} />
                                            <p className='font-bold ml-[8px]'>{thisUser?.userName}</p>
                                            <p className='ml-[8px] text-gray-500'>•</p>
                                            <p className='ml-[3px] text-gray-500'>18ч</p>
                                        </div>
                                        {e.userId == myid ?
                                            <button className='' onClick={() => { setDeletemodal(true), setIddelete(e.postId) }}>
                                                <MoreHorizIcon className=' cursor-pointer' />
                                            </button> :
                                            <button className='' onClick={() => setDeletemodal2(true)}>
                                                <MoreHorizIcon className='cursor-pointer' />
                                            </button>
                                        }
                                    </div>

                                    <div className="w-[100%] min-h-[270px] mt-[10px] overflow-hidden flex justify-center items-center rounded-[5px] bg-[black]">
                                        <Swiper spacebetween={50} pagination={true} navigation={true} modules={[Pagination, Navigation]}>
                                            {
                                                e.images.map((imgX, i) => {
                                                    return (
                                                        <SwiperSlide key={i}>
                                                            {
                                                                <img src={`${import.meta.env.VITE_APP_FILES_URL}${imgX}`} className='w-[100%]' alt="" />
                                                            }
                                                        </SwiperSlide>
                                                    )
                                                })
                                            }
                                        </Swiper>
                                        {/* <img src={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`} className='w-[100%]' alt="" /> */}
                                        {/* <img src={getImage.img} alt="" /> */}
                                    </div>

                                    <div className="w-[95%] sm:w-[100%] mt-[10px]">
                                        <div className="w-[100%] h-[40px] flex justify-between items-center">
                                            <div className="w-[100px] flex justify-between items-center">
                                                {e.postLike ? <button onClick={() => likePost(e?.postId)}><FavoriteIcon style={{ color: "red", fontSize: "28px" }} /></button> : <button onClick={() => likePost(e?.postId)}><FavoriteBorderIcon style={{ color: "", fontSize: "28px" }} /></button>}

                                                <button onClick={() => openModalComment(e, e.postId, thisUser)}><ModeCommentOutlinedIcon style={{ fontSize: "25px" }} /></button>
                                                <NearMeOutlinedIcon style={{ fontSize: "25px", color: "black" }} />
                                            </div>
                                            {e?.postFavorite == true ? <button onClick={() => savepost(e.postId)}>
                                                <TurnedInIcon style={{ fontSize: "25px", }} />
                                            </button> :
                                                <button onClick={() => savepost(e.postId)}>
                                                    <BookmarkBorderIcon style={{ fontSize: "25px" }} />
                                                </button>}

                                        </div>
                                        <div className="w-[100%] mt-[5px]">
                                            <p className='text-[14px] font-bold'>
                                                {e?.postLikeCount} отметок "Нравится"
                                            </p>
                                        </div>
                                        <div className="w-[100%] mt-[5px]">
                                            <p className='text-[14px]'>
                                                <span className='font-bold'>{thisUser?.userName} </span>
                                                {e?.title}
                                            </p>
                                        </div>
                                        <div className="w-[100%] text-gray-500">
                                            <p className='text-[14px]'>{e.content}</p>
                                        </div>
                                        <div className="w-[100%] font-bold my-[5px]">
                                            <p className='text-[14px]'>Показать перевод</p>
                                        </div>
                                        <div className="w-[100%] text-[14px] text-gray-500">
                                            <button onClick={() => openModalComment(e, e.postId, thisUser)}>
                                                <p className='text-[14px]'>Посмотреть все коментарии ({e?.commentCount})</p>
                                            </button>
                                        </div>
                                        <div className="w-[100%] text-[14px] text-gray-500  mt-[5px]">
                                            {/* <input type="text" placeholder='Добавьте коментарии' className=''/> */}
                                            <button onClick={() => openModalComment(e, e.postId, thisUser)}>
                                                <p className='text-[14px]'>Добавьте коментарии</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-[383px] hidden lg2:flex justify-end items-start">
                <div className="w-[315px] h-[100vh]">
                    <div className="w-[100%] h-[45px] flex justify-between items-center">
                        <div className="w flex justify-start items-center">
                            <img src={getImage?.img2} className='w-[45px] h-[45px] rounded-[50%]' alt="" />
                            <p className='text-[14px] font-bold ml-[8px]'>wwwass</p>
                        </div>
                        <p className='text-[13px] font-bold ml-[8px] text-[#0095f6]'>Переключиться</p>
                    </div>
                    <div className="w-[100%] flex justify-between items-center my-[20px]">
                        <p className='text-[14px] font-bold text-[#737373]'>Рекомендации для вас</p>
                        <p className='text-[14px] font-bold text-[#000000]'>Bce</p>
                    </div>
                    <div className="w-[100%] h-[45px] flex justify-between items-center mb-[10px]">
                        <div className="w flex justify-start items-center">
                            <img src={getImage?.img} className='w-[45px] h-[45px] rounded-[50%]' alt="" />
                            <div className="ml-[8px]">
                                <p className='text-[14px] font-bold'>cristiano</p>
                                <p className='text-[13px] text-[#737373]'>Ваш подписчик</p>
                            </div>
                        </div>
                        <p className='text-[13px] font-bold ml-[8px] text-[#0095f6]'>Подписаться</p>
                    </div>
                    <div className="w-[100%] h-[45px] flex justify-between items-center mb-[10px]">
                        <div className="w flex justify-start items-center">
                            <img src={getImage?.img3} className='w-[45px] h-[45px] rounded-[50%]' alt="" />
                            <div className="ml-[8px]">
                                <p className='text-[14px] font-bold'>liberty</p>
                                <p className='text-[13px] text-[#737373]'>Рекомендации для вас</p>
                            </div>
                        </div>
                        <p className='text-[13px] font-bold ml-[8px] text-[#262626] hover:text-[#737373]'>Подписки</p>
                    </div>
                    <div className="w-[100%] text-[12px] text-gray-300">
                        <p>Информация</p><p>Помощь</p><p>Пресса</p><p></p>
                    </div>
                </div>
            </div>

            {/* deletemodal */}
            {
                deletemodal ? <div className='modal fixed ab'>

                    <div className='modal-content hover:cursor-pointer mt-[10%] text-center dark:bg-[#363636] rounded-[20px]'>
                        <div className="flex justify-center items-center px-[5%]">
                            <button className='text-[20px] mb-[2%] font-bold text-[red] pt-[5%]' onClick={() => postdelete(iddelete)}>Удалить</button>
                        </div>
                        <hr />
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Добавить в Избранное</h1>
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Перейти к публикации</h1>
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Поделиться</h1>
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Копировать ссылку</h1>
                        <h1 className='text-[20px] font-[600] mt-[3%]' onClick={() => setDeletemodal(false)}>Отмена</h1>

                    </div>
                </div> : null

            }
            {
                deletemodal2 ? <div className='modal fixed ab '>

                    <div className='modal-content hover:cursor-pointer mt-[10%] text-center dark:bg-[#363636] rounded-[20px]'>
                        <div className="flex justify-center items-center px-[5%]">
                            <button className='text-[20px] mb-[2%] font-bold text-[red] pt-[5%]'>Пожаловаться</button>
                        </div>
                        <hr />
                        <button className='text-[15px] pb-[3%] mt-[3%] mb-[2%] text-[red] border-b-2 w-[100%]'>Отменить подписку</button>
                        <br />
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Добавить в Избранное</h1>
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Перейти к публикации</h1>
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Поделиться</h1>
                        <h1 className='text-[15px] border-b-2 pb-[3%] font-[200] mt-[3%]'>Копировать ссылку</h1>
                        <h1 className='text-[20px] font-[600] mt-[3%]' onClick={() => setDeletemodal2(false)}>Отмена</h1>

                    </div>
                </div> : null

            }

            {Modalstory ? (
                <div className="bg-black/60 duration-200  flex items-center justify-center w-full top-0 fixed h-screen left-0 z-30">
                    <div className="bg-white rounded-[12px] shadow-[1px_1px_40px_5px] shadow-black/10 duration-300 max-w-[350px] md:max-w-[500px] w-full max-h-[400px] md:max-h-[530px] dark:bg-[#1F2E35] dark:text-white">
                        <p className="border-b py-[10px] font-[500] text-center border-gray-300">
                            Create a story <span onClick={() => setModalstory(false)} className='pr-[10px] float-right hover:opacity-50'><CloseIcon /></span>
                        </p>
                        <div className="flex flex-col justify-center items-center gap-[10px]">
                            <div className=''>
                                {/* <CollectionsIcon style={{ fontSize: "100px" }} /> */}
                            </div>
                            <p className="text-[20px]">Добавьте новый сторис</p>

                            <input value={storyid} onChange={(e) => setStoryid(e.target.value)} className='pl-[10px] rounded-[10px] border border-gray-600' type="text" placeholder='Enter postId' /> <br />
                            <input multiple type="file" onChange={(e) => setPhoto(e.target.files[0])} />

                            <button onClick={() => addstory()} className="bg-sky-500 mt-[8px] mb-[40px] hover:bg-sky-600 text-white font-[500] text-[14px] rounded-[6px] px-[16px] py-[4px]">
                                Создать сторис
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* {
                modalka ? <div className='modalstory h-[100%] w-[100%] ml-0 left-0  top-0 fixed e '>
                    <div className="div flex w-[30%] bg-[red] m-auto justify-evenly h-[70vh] mt-[7%]">
                    <h1>Hello</h1>
                    <h1 onClick={()=>setModalka(false)}>X</h1>
                    <div className="div">
                        <div className="">
                           {story.map((e)=>{
                            return <div>
                                <h1>{e.createAt}</h1>
                                <img src={e.userAvatar} alt="" />
                            </div>
                           })}
                        </div>
                    </div>
                    </div>




                </div> : null
            } */}


        </div>
    )

}

export default Home