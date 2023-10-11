import React, { useEffect, useState } from 'react'
import { getToken } from '../../utils/token';
import { axiosRequest } from '../../utils/axiosRequest';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PaddingOutlinedIcon from '@mui/icons-material/PaddingOutlined';
import JoinRightIcon from '@mui/icons-material/JoinRight';
import { getImage } from '../../images/getImage';
import { Female } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AccountEdit = () => {
    const [myProfile, setMyProfile] = useState({})
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const [second, setSecond] = useState("")
    const [gender, setGender] = useState(0)
    const [about, setAbout] = useState("")
    const [job, setJob] = useState("")


    const navigate = useNavigate()

    // get my profile
    async function getMyProfile(){
        try {
            let {data} = await axiosRequest.get(`UserProfile/get-UserProfile-by-id?id=${getToken().sid}`)
            setMyProfile(data.data)
            setName(data.data.firstName)
            setSecond(data.data.lastName)
            setGender(data.data.gender)
            setAbout(data.data.about)
            setJob(data.data.occupation)
        } catch (error) {
            
        }
    }
    const updateProfile = async(event)=>{
        event.preventDefault()
        try {
            let obj = new FormData()
            obj.append("Image", image?image:myProfile.image)
            obj.append("DateUpdated", myProfile.dateUpdated)
            obj.append("Gender", gender=="Мужской"?1:0)
            obj.append("FirstName", name)
            obj.append("LastName", second)
            obj.append("LocationId", 1)
            obj.append("DOB", myProfile.dob)
            obj.append("Occupation", job)
            obj.append("About", about)
            let {data} = await axiosRequest.put("UserProfile/update-UserProfile", obj)
            getMyProfile()
            navigate("/basic/profile")
        } catch (error) {}
    }
    useEffect(()=>{
        getMyProfile()
    },[])

    return (
        <div className='ml-[0px] md:ml-[70px] lg3:ml-[17.2%] flex  justify-start items-start'>
            <div className="w-[325px] h-[100vh] bg-[#f8f8f8] flex flex-wrap justify-center content-start overflow-y-scroll py-[20px]">
                <div className="w-[265px] h-[290px] bg-[white] px-[15px] py-[10px] rounded-[20px]">
                    <p className='text-[18px] font-mono text-[#0095f6]'><JoinRightIcon/> Meta</p>
                    <p className='text-[16px] font-bold my-[5px]'>Центр аккаунтов</p>
                    <p className='text-[12px] text-gray-500'>Управляйте кросс-сервисными функциями и настройками аккаунтов на платформах Meta.</p>
                    <p className='text-[12px] text-gray-500 hover:text-[#0095f6] mt-[10px] flex justify-start items-center '>
                        <PersonOutlineOutlinedIcon/>
                        <span className='ml-[10px]'>Личная информация</span>
                    </p>
                    <p className='text-[12px] text-gray-500 hover:text-[#0095f6] mt-[10px] flex justify-start items-center'>
                        <ShieldOutlinedIcon/>
                        <span className='ml-[10px]'>Поменять пароль</span>
                    </p>
                    <p className='text-[12px] text-gray-500 hover:text-[#0095f6] mt-[10px] flex justify-start items-center'>
                        <PaddingOutlinedIcon/>
                        <span className='ml-[10px]'>Рeкламные предпочтения</span>
                    </p>
                    <p className='text-[12px] text-[#0095f6] font-bold mt-[10px]'>Больше настроек в Центре аккаунтов</p>
                </div>
                <div className="w-[100%] my-[20px]">
                    <p className='text-[20px] font-bold ml-[50px]'>Настройки</p>
                </div>
                <div className="w-[230px] mr-[15px]">
                    <button className='w-[230px] h-[50px] text-start bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Редактировать профиль</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Языковые предпочтения</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Приложения и сайты</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Уведомления по электронной почте</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Push-уведомления</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Что вы видите</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Кто может видеть ваш контент</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Взаимодействие с вами</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Контроль</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] ml-[18px]'>Помощь</p>
                    </button>
                    <button className='w-[230px] h-[50px] text-start hover:bg-[#eeeeee] rounded-[10px] mr-[10px]'>
                        <p className='text-[14px] font-bold text-[#0095f6] ml-[18px]'>Переключение на профессиональный аккаунт</p>
                    </button>
                </div>
            </div>
            <div className="w-[850px] h-[100vh] py-[60px] flex flex-wrap justify-start content-start">
                <div className="w-[100%]">
                    <p className='text-[24px] ml-[45px]'>Редактировать профиль</p>
                </div>
                <form action="" className='w-[100%] mt-[50px]' onSubmit={updateProfile}>
                    <div className="w-[100%] flex">
                        <div className="w-[165px] flex justify-end items-center h-[50px] mr-[20px]">
                            <img src={`${import.meta.env.VITE_APP_FILES_URL}${myProfile.image}`} className='w-[45px] h-[45px] rounded-[50%] bg-[black]' alt="" />
                        </div>
                        <div className="">
                            <p className='text-[14px] font-bold mb-[5px]'>{getToken().name}</p>
                            <input type="file" className='text-[#0095ef] outline-none' onChange={(e)=>setImage(e.target.files[0])}/>
                        </div>
                    </div>
                    <div className="w-[100%] flex mt-[20px]">
                        <div className="w-[165px] flex justify-end items-center h-[50px] mr-[20px]">
                            <p className='text-[16px]'>Имя</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <input type="text" className='w-[355px] h-[32px] pl-[10px] rounded-[5px] outline-none bg-[#efefef]' value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="w-[100%] flex">
                        <div className="w-[165px] flex justify-end items-center h-[50px] mr-[20px]">
                            <p className='text-[16px]'>Фамилия</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <input type="text" className='w-[355px] h-[32px] pl-[10px] outline-none rounded-[5px] bg-[#efefef]' value={second} onChange={(e)=>setSecond(e.target.value)}/>
                            
                        </div>
                    </div>
                    <div className="w-[100%] flex">
                        <div className="w-[165px] flex justify-end items-center h-[50px] mr-[20px]">
                            <p className='text-[16px]'>Пол</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <select type="text" className='w-[355px] h-[32px] pl-[10px] rounded-[5px] border-[1px] border-gray-300' value={gender} onChange={(e)=>setGender(e.target.value)}>
                                <option name="" id="">{gender=="Female"?"Женский":"Мужской"}</option>
                                <option name="" id="">{gender=="Male"?"Женский":"Мужской"}</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-[100%] flex">
                        <div className="w-[165px] flex justify-end items-center h-[50px] mr-[20px]">
                            <p className='text-[16px]'>О себе</p>
                        </div>
                        <div className="flex justify-end items-center   py-[10px]">
                            <textarea type="text" className='w-[355px] h-[60px] outline-none pl-[10px] pt-[2px] rounded-[5px] border-[1px] border-gray-300' value={about} onChange={(e)=>setAbout(e.target.value)}/>
                        </div>
                    </div>
                    <div className="w-[100%] flex">
                        <div className="w-[165px] flex justify-end items-center h-[50px] mr-[20px]">
                            <p className='text-[16px]'>Работа</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <input type="text" className='w-[355px] outline-none h-[32px] pl-[10px] rounded-[5px] border-[1px] border-gray-300' value={job} onChange={(e)=>setJob(e.target.value)}/>
                        </div>
                    </div>
                    <div className="w-[100%] flex mt-[10px]">
                        <div className="w-[165px] flex justify-end items-center h-[50px] mr-[20px]">
                            {/* <button className='w-[107px] h-[32px] bg-[#0095ef] rounded-[10px] text-[white]'><p>Отправить</p></button> */}
                        </div>
                        <div className="flex justify-end items-center">
                            <button type='submit' className='w-[107px] h-[32px] bg-[#0095ef] rounded-[10px] text-[white]'><p>Отправить</p></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AccountEdit
