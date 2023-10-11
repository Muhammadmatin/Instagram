import React, { useEffect, useState } from 'react'
import { getImage } from '../../images/getImage'
import ClearIcon from '@mui/icons-material/Clear';
import { axiosRequest } from '../../utils/axiosRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from '../../todos/todos';

const SearchSide = () => {
    const navigate = useNavigate()

    const animateSearch = useSelector((store)=> store.todos.animateSearch)
    const animateNotify = useSelector((store)=> store.todos.animateNotify)
    const special = useSelector((store)=> store.todos.special)
    const dispatch = useDispatch()

    const [post, setPost] = useState([])
    const [user, setUser] = useState([])
    const [search, setSearch] = useState("")

    const [storageUser, setStorageUser] = useState(localStorage.getItem("localUser"))

    // Close Search Modal
    function closeModalSearch(){
        dispatch(handleChange({value:"animateSearch", answer:false}))
        dispatch(handleChange({value:"special", answer:false}))
        dispatch(handleChange({value:"animateNotify", answer:false}))
    }

    // Get Users
    async function getData() {
        try {
             const { data } = await axiosRequest.get(`/User/get-users?PageSize=${39}`)
            setUser(data.data)
            } catch (error) {
        }
    }

    // Get Post
    async function getPost() {
        try {
            const { data } = await axiosRequest.get(`Post/get-posts?PageSize=${39}`)
            setPost(data.data)
        } catch (error) {
        }
    }

    // Add Searched User
    function searchedUser(id){
        if(!localStorage.getItem("localUser").split(",").find((e)=> e == id)){
        localStorage.setItem("localUser", [localStorage.getItem('localUser'),id])
        setStorageUser(localStorage.getItem("localUser"))
        }
    }
    // Delete Searched User
    function deleteLocalUser(id){
        let  newUser =  localStorage.getItem("localUser").split(",").filter((e)=> e !== id)
        localStorage.setItem("localUser", [...newUser])
    }

    useEffect(() => {
        getPost()
        getData()
    }, [])
    

  return (
    <div data-aos="fade-left" className="w-[400px] h-[100vh] fixed ml-[70px] border-r-[1px] bg-[white] border-r-gray-300 rounded-r-[10px] abc">
        <div className="w-[100%] h-[152px] flex flex-wrap justify-center content-evenly border-b-[1px] border-b-gray-300">
            <div className="w-[90%]">
                <p className='text-[23px] ml-[10px] font-bold'>Поисковый запрос</p>
            </div>
            <input value={search} onChange={(e)=>setSearch(e.target.value)}
            className='w-[90%] h-[40px] bg-[#efefef] rounded-[10px] pl-[20px] pr-[5px] outline-none' type="search" placeholder='Поиск'/>
        </div>
        <div className="w-[100%]  flex flex-wrap justify-center content-evenly mt-[20px]">
            {
                !search?
                <div className="w-[90%] flex justify-between">
                    <p className='text-[16px] font-bold'>Недавнее</p>
                    <button onClick={()=>{
                        localStorage.setItem("localUser",[]),
                        setStorageUser(localStorage.getItem("localUser"))
                        }} style={{display:!localStorage.getItem("localUser")?"none":""}}
                        className='text-[15px] font-bold ml-[8px] hover:text-[#737373] text-[#0095f6]'>Очистить все</button>
                </div>:""
            }
            <div className="w-[90%] h-[400px] mt-[10px]  overflow-y-auto ">

                {/* Async Users */}
                {user
                ?.filter((e)=>e?.userName?.toLowerCase()?.includes(search?.toLowerCase() || e?.email?.toLowerCase()?.includes(search?.toLowerCase())))
                ?.map((e) => {
                    let avatar = post.find((d) => d.userId == e.id)
                    return (
                    <div key={e.id} className="w-[100%] h-[60px] flex justify-between items-center">
                        <div
                        onClick={()=>{
                            navigate(`/basic/userProfile/${e.id}`),
                            closeModalSearch(),
                            searchedUser(e.id)
                        }}
                        className="w-[50%] h-[60px] flex justify-start items-center cursor-pointer">
                          <div>
                            <img src={`${import.meta.env.VITE_APP_FILES_URL}${avatar?.images[0]}`} className='w-[45px] h-[45px] rounded-[50%]' alt="" /></div> 
                            {/* <img src={getImage.img2} className='w-[45px] h-[45px] rounded-[50%]' alt="" /> */}
                            <div className="ml-[8px]">
                                <p className='text-[14px] font-bold'>{e.userName}</p>
                                <p className='text-[13px] font-bold text-[#737373]'>{e.email}</p>
                            </div>
                        </div>
                        {/* <button><ClearIcon style={{color:"gray"}}/></button> */}
                    </div>
                )})}

                {/* Static Users */}
                {!search?
                    user.filter((e)=> {
                        if(localStorage.getItem("localUser") != null)
                            return localStorage.getItem("localUser").includes(e.id)
                        else{
                            localStorage.setItem("localUser", [])
                        }
                    })
                    .map((e) => {
                        let avatar = post.find((d) => d.userId == e.id)
                        return (
                        <div key={e.id} className="w-[100%] h-[60px] flex justify-between items-center ">
                            <div
                            onClick={()=>{
                                navigate(`/basic/userProfile/${e.id}`),
                                closeModalSearch(),
                                searchedUser(e.id)
                            }}
                            className="w-[50%] h-[60px] flex justify-start items-center cursor-pointer">
                                <div><img src={`${import.meta.env.VITE_APP_FILES_URL}${avatar?.images[0]}`} className='w-[45px] h-[45px] rounded-[50%]' alt="" /></div> 
                                    <div className="ml-[8px]">
                                        <p className='text-[14px] font-bold'>{e.userName}</p>
                                        <p className='text-[13px] font-bold text-[#737373]'>{e.email}</p>
                                    </div>
                                </div>
                                <button onClick={()=>{
                                    deleteLocalUser(e.id),
                                    setStorageUser(localStorage.getItem("localUser"))
                                }}><ClearIcon style={{color:"gray"}}/></button>
                            </div>
                    )}):""
                }

            </div>
        </div>
    </div>
  )
}

export default SearchSide