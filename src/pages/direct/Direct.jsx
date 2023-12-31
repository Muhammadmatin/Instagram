import React, { useEffect, useState } from 'react'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { getImage } from '../../images/getImage';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import NearMeIcon from '@mui/icons-material/NearMe';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import { axiosRequest } from '../../utils/axiosRequest';
import { getToken } from '../../utils/token';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FadeMenu from './FadeMenu';
import CloseIcon from '@mui/icons-material/Close';

const Direct = () => {
    const myId = getToken().sid
    const [text, setText] = useState("")
    const [user, setUser] = useState([])
    const [post, setPost] = useState([])
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState([])

    const [userX, setUserX] = useState({})

    const [chatID, setChatID] = useState(null)

    const [modalChat, setModalChat] = useState(false)
    const [deleteId, setdeleteId] = useState(null)

    const [modalAdd, setModalAdd] = useState(false)
    const [searchText, setSearchText] = useState("")

    // get User
    async function getUser(){
        try {
            let {data} = await axiosRequest.get('User/get-users')
            setUser(data.data)
            // console.log(data.data);
        } catch (error) {
            
        }
    }

    // get Chat
    async function getChat(){
        try {
            let {data} = await axiosRequest.get('Chat/get-chats')
            setChat(data.data)
            // console.log(data.data);
        } catch (error) {
            
        }
    }

    // delete Chat
    async function deleteChat(){
        try {
            let {data} = await axiosRequest.delete(`Chat/delete-chat?chatId=${deleteId}`)
            getChat()
            // setChatID(null)
            setModalChat(false)
            setChatID(null)
        } catch (error) {
            
        }
    }

    // get Message of Chat
    async function getMessage(id){
        try {
            let {data} = await axiosRequest.get(`Chat/get-chat-by-id?chatId=${id}`)
            setMessage(data.data.reverse())
            setChatID(id)
        } catch (error) {
            
        }
    }

    // send Message
    const sendMessage = async(event)=>{
        event.preventDefault()
            if(text){
                try {
                    let obj = {
                        "chatId": chatID,
                        "messageText": text
                    }
                    let {data} = await axiosRequest.put('Chat/send-message', obj)
                    getMessage(chatID)
                    setText("")
                } catch (error) {
                    
                }
            }
            else{
                getMessage(chatID)
                alert("Plz type some text !")
            }
        // console.log(`chatId: ${chatID}, messageText: ${text}`);
    }

    // delete Message
    async function deleteMessage(id){
        try {
            let {data} = await axiosRequest.delete(`Chat/delete-message?massageId=${id}`)
            getMessage(chatID)
        } catch (error) {
            
        }
    }
    // create Chat
    async function createChat(id){
        if(!chat.find(e=>e.receiveUserId == id)){
            try {
                let {data} = await axiosRequest.post(`Chat/create-chat?resceiveUserId=${id}`)
                getChat()
                setModalAdd(false)    
            } catch (error) {
                
            }
        }else{
            let idChat = chat.find(e=> e.receiveUserId == id).chatId
            getMessage(idChat)
            setChatID(idChat)
            setModalAdd(false)
            let thisUser = user.find(a=> a.id == id)
            setUserX(thisUser)
        }
    }
    
    useEffect(()=>{
        getUser()
        // getPost()
        getChat()
    },[])
    console.log(chat);

    return (
        <div className='ml-[0px]  h-[100vh] flex justify-start items-start'>
            {/* users */}
        <div className="w-[29.2%] md:ml-[70px] h-[100%] justify-center content-start flex flex-wrap border-r-[1px] border-r-gray-300">
            <div className="w-[90%] h-[40px] flex justify-between items-center mt-[30px]">
                <p className='text-[20px] font-bold'>{getToken()?.name}</p>
                <button onClick={()=>setModalAdd(true)} className='w-[40px] h-[40px] hover:text-gray-500'>
                    <EditCalendarOutlinedIcon style={{fontSize:"30px"}}/>
                </button>
            </div> 
            <div className="w-[90%] h-[40px]  flex justify-between items-end">
                <p className='text-[16px] font-bold'>Сообщения</p>
                <p className='text-[14px] font-bold text-[#737373] cursor-pointer'>Запросы</p>
            </div>
            <div className="w-[100%] h-[83vh] mt-[10px] overflow-y-scroll">
                {
                    chat?.map((e)=>{
                        let thisUser = user.find(a=> a.id == e.receiveUserId)        
                        return(
                            <div className="w-[100%] hover:bg-[#efefef] px-[10px] flex justify-between items-center py-[10px] h-[76px]">
                                <div className="w-[55px] h-[55px] overflow-hidden rounded-[50%] border-[2px] bg-[gray] border-[#efefef] flex justify-center items-center">
                                    {   
                                        thisUser?.avatar?
                                        <img src={`${import.meta.env.VITE_APP_FILES_URL}${thisUser?.avatar}`}  className='w-[56px] h-[56px] object-cover' alt="" />:
                                        <AccountCircleIcon style={{fontSize:"80px", color:"#efefef", backgroundColor:"white"}}/>
                                    }
                                    {/* <AccountCircleIcon style={{fontSize:"80px", color:"#efefef", backgroundColor:"white"}}/> */}
                                </div>
                                <div onClick={()=>{getMessage(e.chatId),setUserX(thisUser)}} className="w-[40%] mr-[90px] cursor-pointer ml-[10px] flex flex-wrap justify-start content-evenly">
                                    <p className='text-[14px] w-[100%]'>{thisUser?.userName}</p>
                                    <p className='text-[12px] text-[#737373]'>{thisUser?.email}</p>
                                </div>
                                <button onClick={()=>{
                                    setModalChat(true),
                                    setdeleteId(e.chatId)
                                }} className="w-[30px] h-[30px] flex justify-center cursor-pointer items-center text-[#737373] hover:text-[black] text-[25px]">
                                    <MoreVertIcon/>
                                </button>
                            </div>
                        )    
                    })
                }
            </div>
        </div>

            {/* message */}
        <div className="w-[71.5%] h-[100%]">
            {
                !chatID?
                <div className="w-[100%] h-[100%] flex justify-center items-center">
                <div className="w-[410px] text-center flex flex-wrap justify-center contents-start">
                    <div className="w-[96px] h-[96px] rounded-[50px] flex justify-center items-center border-[3px] border-[black]">
                        <MessageOutlinedIcon style={{fontSize:"40px"}}/>
                    </div>
                    <p className='text-[20px] w-[100%] mt-[10px]'>Ваши сообщения</p>
                    <p className='text-[14px] text-[#737373] mt-[8px] mb-[15px]'>Отправляйте личные фото и сообщения другу или группе</p>
                    <button onClick={()=>setModalAdd(true)} className='w-[210px] h-[32px] rounded-[10px] text-[14px] text-[white] font-bold bg-[#0095f6]'>Отправить сообщение</button>
                </div>
                </div>:
                <div className="w-[100%] h-[100vh]">
                    <div className="w-[100%] h-[9vh] flex justify-between items-center border-b-[1px] border-b-gray-300">
                        <div className="w-[40%] flex my-[20px] h-[44px]">
                            <div className="w-[44px] h-[44px] border-[2px] border-[#efefef] flex justify-center items-center overflow-hidden rounded-[50%] ml-[20px]">
                                {
                                    userX.avatar?
                                    <img src={`${import.meta.env.VITE_APP_FILES_URL}${userX?.avatar}`} className='h-[44px] object-cover' alt="" />:
                                    <AccountCircleIcon style={{fontSize:"70px", color:"#efefef"}}/>
                                }
                            </div>
                            <div className="w-[200px] cursor-pointer ml-[10px] flex flex-wrap justify-start content-evenly">
                                <p className='text-[16px] font-bold w-[100%]'>{userX?.userName}</p>
                            </div>
                        </div>
                        <div className="w-[120px] mr-[20px] h-[44px] flex justify-between items-center">
                            <CallIcon style={{fontSize:"30px"}}/>
                            <VideocamOutlinedIcon style={{fontSize:"35px"}}/>
                            <InfoOutlinedIcon style={{fontSize:"30px"}}/>
                        </div>
                    </div>
                    <div className="w-[100%] h-[82vh] flex flex-wrap justify-center content-start overflow-y-scroll">
                        <div className="w-[100%] h-[274px] flex flex-wrap justify-center content-center text-center">
                            <div className="w-[96px] h-[96px] border-[2px] border-[#efefef] flex justify-center items-center overflow-hidden rounded-[50%]">
                                {
                                    userX.avatar?
                                    <img src={`${import.meta.env.VITE_APP_FILES_URL}${userX?.avatar}`} className='h-[56px] object-cover' alt="" />:
                                    <AccountCircleIcon style={{fontSize:"150px", color:"#efefef"}}/>
                                }
                            </div>
                            <p className='text-[20px] font-bold w-[100%] mt-[15px]'>{userX?.userName}</p>
                            <p className='text-[14px] text-[#737373] w-[100%]'>{userX?.email}</p>
                            <button className='w-[164px] h-[32px] rounded-[10px] text-[14px] mt-[20px] font-bold bg-[#efefef]'><p>Смотреть профиль</p></button>
                        </div>
                        {/* user's avatar and info  */}
                        <div className="w-[100%] py-[22px] text-center text-[12px] text-[#65676b]">
                            <p>19 сен 2023 г., 16:43</p>
                        </div>
                        {/* start chat */}
                        {
                        message?.map((e)=>{
                            let logic = e.userId == myId
                            return(
                                <div style={{justifyContent:logic?"end":"start"}} className="w-[100%] my-[2px] flex mr-[10px]">
                                    {!logic?<div className="w-[28px] h-[28px] mx-[10px] border-[2px] border-[#efefef] flex justify-center items-center overflow-hidden rounded-[50%]">
                                        {/* <img src={getImage.avatar} className='h-[44px] object-cover' alt="" /> */}
                                        <AccountCircleIcon style={{fontSize:"30px", color:"#efefef"}}/>
                                    </div>:""}
                                    {logic?<FadeMenu deleteMessage = {deleteMessage} id= {e.messageId}/>:null}
                                    <p style={{backgroundColor:logic?"#3797f0":"#efefef",color:logic?"white":"black"}} className='max-w-[654px] overflow-hidden min-h-[34px]  text-[15px] py-[5px] px-[10px] rounded-[12px]'>{e?.messageText}</p>
                                </div>        
                            )
                        })}
                    </div>
                    <div className="w-[100%] h-[8.5vh] flex justify-center items-center bg-[white] top-[91vh]">
                        <div className="w-[95%] h-[45px] flex justify-center items-center rounded-[20px] border-[1px] border-gray-300">
                            <form onSubmit={sendMessage} action="" className='w-[98%] flex justify-between items-center'>
                                <SentimentSatisfiedAltIcon style={{color:"black",fontSize:"28px"}}/>
                                <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder='Напишите сообщение' className='outline-none text-[15px] w-[80%] h-[40px]'/>
                                {text?<button type='submit' className='w-[15%] text-[14px] text-[#0095fe] hover:text-[#737373] font-bold'>Отправить</button>:
                                <div className="w-[15%] flex justify-between items-center pl-[25px]">
                                    <KeyboardVoiceOutlinedIcon style={{color:"black",fontSize:"28px"}}/>
                                    <ImageOutlinedIcon style={{color:"black",fontSize:"28px"}}/>
                                    <FavoriteBorderOutlinedIcon style={{color:"black",fontSize:"28px"}}/>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>

            {/* modal Delete */}
        {   
            modalChat?
            <div style={{backgroundColor:"rgba(0, 0, 0, 0.5)"}} className="w-[100%] h-[100vh] fixed flex justify-center items-center">
            <div className="w-[350px] h-[190px] flex flex-wrap justify-center content-evenly  rounded-[20px] bg-[white]">
                <div onClick={()=>deleteChat()} className="w-[100%] h-[60px] cursor-pointer flex justify-center items-center border-b-[1px] border-b-gray-300 mt-[10px]">
                    <p className='text-[14px] text-[red] font-bold'>Удалить данный чат</p>
                </div>
                <div className="w-[100%] h-[60px] cursor-pointer flex justify-center items-center border-b-[1px] border-b-gray-300">
                    <p className='text-[14px] font-bold'>Заблокировать данного пользователя</p>
                </div>
                <div onClick={()=>setModalChat(false)} className="w-[100%] h-[60px] cursor-pointer flex justify-center items-center">
                    <p className='text-[14px] font-bold'>Отмена</p>
                </div>
            </div>
            </div>:""
        }
        {
            modalAdd?
            <div style={{backgroundColor:"rgba(0, 0, 0, 0.5)"}} className="w-[100%] h-[100vh] fixed flex justify-center items-center">
                <div className="w-[500px] h-[450px] rounded-[20px] bg-[white]">
                    <div className="w-[100%] h-[55px] flex justify-between items-center">
                        <div className='w-[55px] h-[55px]'></div>
                        <p className='text-[16px] font-bold'>Новое сообщение</p>
                        <button onClick={()=>{setModalAdd(false),setSearchText("")}} className='w-[55px] h-[55px]'><CloseIcon/></button>
                    </div>
                    <div className="w-[100%] h-[40px] flex justify-start items-center pl-[20px] border-[1px] border-gray-300">
                        <p className='text-[16px] font-bold'>Кому :</p>
                        <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} type="text" className='h-[38px] w-[75%] outline-none pl-[15px] text-[15px]' />
                    </div>
                    <div className="w-[100%] h-[310px] overflow-y-auto flex flex-wrap justify-start content-start">
                        {
                            user?.filter((e)=>e?.userName?.toLowerCase()?.includes(searchText?.toLowerCase() || e?.email?.toLowerCase()?.includes(searchText?.toLowerCase())))
                            .map((e)=> {
                                return (
                                    <div className="w-[100%] hover:bg-[#efefef] px-[20px] flex justify-between items-center py-[10px] h-[76px]">
                                        <div className="w-[55px] h-[55px] overflow-hidden rounded-[50%] border-[2px] bg-[gray] border-[#efefef] flex justify-center items-center">
                                            {   
                                                e.avatar?
                                                <img src={`${import.meta.env.VITE_APP_FILES_URL}${e?.avatar}`}  className='w-[56px] h-[56px] object-cover' alt="" />:
                                                <AccountCircleIcon style={{fontSize:"80px", color:"#efefef", backgroundColor:"white"}}/>
                                            }
                                            {/* <AccountCircleIcon style={{fontSize:"80px", color:"#efefef", backgroundColor:"white"}}/> */}
                                        </div>
                                        <div className="w-[40%] mr-[90px] cursor-pointer ml-[10px] flex flex-wrap justify-start content-evenly">
                                            <p className='text-[14px] w-[100%]'>{e?.userName}</p>
                                            <p className='text-[12px] text-[#737373]'>{e?.email}</p>
                                        </div>
                                        <button onClick={()=>createChat(e.id)} className="w-[120px] h-[35px] flex justify-center cursor-pointer items-center rounded-[15px] bg-[gray] hover:bg-[#0095ee] font-bold text-[white] text-[12px]">
                                            Отправить
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={()=>{setModalAdd(false),setSearchText("")}} className='w-[100%] h-[40px] text-[#0095ee]'>
                        <p className='text-[15px] font-bold text-[#0095ee]'>Отмена</p>
                    </button>
                </div>
            </div>:""
        }
        </div>
    )
}

export default Direct