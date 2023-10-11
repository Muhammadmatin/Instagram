import React, { useEffect } from 'react'
import './Layout.css'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getImage } from '../images/getImage'
import InstagramIcon from '@mui/icons-material/Instagram';
import './Layout.css'

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import MovieIcon from '@mui/icons-material/Movie';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import MessageIcon from '@mui/icons-material/Message';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconNavbar from '../components/iconNavbar/IconNavbar';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelect } from '@mui/base';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from '../todos/todos';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
// import TemporaryDrawer from '../components/searchSide/SearchSide';
// import SearchSide from '../components/searchSide/SearchSide';

import ClearIcon from '@mui/icons-material/Clear';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// data aos animation
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Icon2 } from '../components/iconNavbar/Icon2';
import BasicMenu from '../components/option/BasicMenu';

// basic menu
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switcher from '../components/darkMode/Switcher';
import { destroyToken } from '../utils/token';
import SearchSide from '../components/searchSide/SearchSide';

const Layout = () => {

    // adding
    const location = useLocation()
    const animateSearch = useSelector((store)=> store.todos.animateSearch)
    const animateNotify = useSelector((store)=> store.todos.animateNotify)
    const special = useSelector((store)=> store.todos.special)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // basic menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    clearX
    };
    const handleClose = () => {
    setAnchorEl(null);
    clearX
    };

    useEffect(() => {
        AOS.init();
      }, [])

    function clearX(){
        dispatch(handleChange({value:"special", answer:false}))
        dispatch(handleChange({value:"animateSearch", answer:false}))
        dispatch(handleChange({value:"animateNotify", answer:false}))
    }  
    function animateX(parametr=""){
        if(parametr == 1 ){
            dispatch(handleChange({value:"animateSearch", answer:!animateSearch}))
            dispatch(handleChange({value:"animateNotify", answer:false}))
            // dispatch(handleChange({value:"special", answer:!animateSearch}))
            if(location.pathname == "/basic/direct"){
                dispatch(handleChange({value:"special", answer:true}))    
            }else{
            dispatch(handleChange({value:"special", answer:!animateSearch}))}
        }else if(parametr == 2){
            dispatch(handleChange({value:"animateNotify", answer:!animateNotify}))
            dispatch(handleChange({value:"animateSearch", answer:false}))
            if(location.pathname == "/basic/direct"){
                dispatch(handleChange({value:"special", answer:true}))    
            }else{
            dispatch(handleChange({value:"special", answer:!animateNotify}))}
        }else if(parametr == 3){
            dispatch(handleChange({value:"animateNotify", answer:false}))
            dispatch(handleChange({value:"special", answer:true}))
            dispatch(handleChange({value:"animateSearch", answer:false}))
        }
    }
    return (
        <div className='w-[100%] dark:bg-[black] dark:text-[white]'>
            <div style={{width:special?"70px":"17.2%"}} className="duration-[350ms] bg-[white]  h-[100vh] hidden md:flex justify-center items-center fixed border-r-[1px] border-r-gray-300">
                <div className="h-[100vh] flex flex-wrap justify-start content-between">
                    <div style={{marginLeft: "7px",width:special?"60px":"215px"}} className="mt-[40px]">
                        <div className="h-[60px] mb-[10px] hidden lg3:flex justify-start items-start">
                            <Link to="/basic">{!special?<img src={getImage.logo} className='h-[30px] ml-[10px] mb-[35px]' alt="" />:
                            <IconNavbar text="" linkX="/" icon1={<InstagramIcon style={{fontSize:"30px",margin:"10px"}}/>}/>}</Link>
                        </div>
                        <div className="h-[60px] mb-[10px] flex lg3:hidden justify-start items-start">
                            <Link to="/basic"><IconNavbar text="" linkX="/" icon1={<InstagramIcon style={{fontSize:"30px",margin:"10px"}}/>}/></Link>
                        </div>

                        <button onClick={()=>clearX()}><Link to="/basic"><IconNavbar text="Главная" linkX="/basic" icon1={<HomeIcon style={{fontSize:"30px",margin:"10px"}}/>}/></Link></button>
                        <button onClick={()=>animateX(1)}><IconNavbar text="Поисковый запрос" icon1={<SearchOutlinedIcon style={{fontSize:"30px",margin:"10px"}}/>}/></button>
                        <button onClick={()=>clearX()}><Link to="explore"><IconNavbar text="Интересное" icon1={<ExploreOutlinedIcon style={{fontSize:"30px",margin:"10px"}}/>}/></Link></button>
                        <button onClick={()=>clearX()}><Link to="reels"><IconNavbar text="Reels" icon1={<MovieOutlinedIcon style={{fontSize:"30px",margin:"10px"}}/>}/></Link></button>
                        <button onClick={()=>animateX(3)}><Link to="direct"><IconNavbar text="Сообщения" icon1={<MessageOutlinedIcon style={{fontSize:"30px",margin:"10px"}}/>}/></Link></button>
                        <button onClick={()=>animateX(2)}><IconNavbar text="Уведомления" icon1={<FavoriteBorderOutlinedIcon style={{fontSize:"30px",margin:"10px"}}/>}/></button>
                        <button onClick={()=>clearX()}>
                        <Link to={"/basic/Sozdat"}>
                        <IconNavbar text="Создать" icon1={<AddBoxOutlinedIcon style={{fontSize:"30px",margin:"10px"}}/>}/>
                        </Link>
                        </button>
                        <button onClick={()=>clearX()}><Link to="profile"><IconNavbar text="Профиль" icon1={<AccountCircleOutlinedIcon  style={{fontSize:"30px",margin:"10px"}}/>}/></Link></button>
                    </div>
                    <div style={{marginLeft: "7px"}} className="w-[100%] mb-[40px]">
                        
                        {/* basic menu */}
                        <div>
                            <button id="basic-button" onClick={handleClick}>
                                <IconNavbar text="Ещё" icon1={<MenuIcon  style={{fontSize:"30px",margin:"10px"}}/>}/>
                            </button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                // MenuListProps={{
                                // 'aria-labelledby': 'basic-button',
                                // }}
                            >
                                <div className="w-[260px] h-[405px] flex flex-wrap justify-center">
                                    <button className='h-[48px] w-[215px] mt-[5px] flex items-center hover:bg-[#eeeeee] rounded-[10px] m-[10px]'>
                                        <Switcher/>
                                        <p className='text-[15px] ml-[20px]'>Переключить режим</p>
                                    </button>
                                    <button className='h-[48px] w-[215px] mt-[5px] flex items-center hover:bg-[#eeeeee] rounded-[10px] m-[10px]'>
                                        <SettingsIcon style={{fontSize:"23px",margin:"10px"}}/>
                                        <p className='text-[15px]'>Настройки</p>
                                    </button>
                                    <button className='h-[48px] w-[215px] mt-[5px] flex items-center hover:bg-[#eeeeee] rounded-[10px] m-[10px]'>
                                        <SettingsIcon style={{fontSize:"23px",margin:"10px"}}/>
                                        <p className='text-[15px]'>Настройки</p>
                                    </button>
                                    <button onClick={()=>{
                                        destroyToken()
                                        navigate("/")
                                    }} className='h-[48px] w-[215px] mt-[5px] flex items-center hover:bg-[#eeeeee] rounded-[10px] m-[10px]'>
                                        <LoginIcon style={{fontSize:"23px",margin:"10px"}}/>
                                        <p className='text-[15px]'>Выйти</p>
                                    </button>
                                </div>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            {animateSearch?
                <SearchSide/>:""}
            {animateNotify?
            <div data-aos="fade-left" className="w-[400px] h-[100vh] fixed ml-[70px] border-r-[1px] bg-[white] border-r-gray-300 rounded-r-[10px] abc">
                    <div className="w-[100%] h-[120px] flex flex-wrap justify-center content-evenly border-b-[1px] border-b-gray-300">
                        <div className="w-[90%]">
                            <p className='text-[23px] ml-[10px] font-bold'>Уведомления</p>
                            <p className='text-[20px] ml-[10px] font-bold'>На этой неделе</p>
                        </div>
                        {/* <input className='w-[90%] h-[40px] bg-[#efefef] rounded-[10px] pl-[20px]' type="search" placeholder='Поиск'/> */}
                    </div>
                    <div className="w-[100%] flex flex-wrap justify-center content-evenly mt-[20px]">
                        {/* <div className="w-[90%] flex justify-between">
                            <p className='text-[16px] font-bold'>Недавнее</p>
                            <p className='text-[15px] font-bold ml-[8px] hover:text-[#737373] text-[#0095f6]'>Очистить все</p>
                        </div> */}
                        <div className="w-[90%] mt-[10px]">
                            <div className="w-[100%] h-[60px] flex justify-between items-center">
                                <div className="h-[60px] flex justify-start items-center">
                                    <img src={getImage.img2} className='w-[45px] h-[45px] rounded-[50%]' alt="" />
                                    <div className="ml-[8px]">
                                        <p className='text-[14px] font-bold'>alexpereira</p>
                                        <p className='text-[13px] font-bold text-[#737373]'>Alex P.</p>
                                    </div>
                                </div>
                                <button className='px-[20px] h-[32px] text-[13px] rounded-[10px] text-[white] font-bold bg-[#0095f6]'>Подписаться</button>
                            </div>
                            <div className="w-[100%] h-[60px] flex justify-between items-center">
                                <div className="h-[60px] flex justify-start items-center">
                                    <img src={getImage.avatar} className='w-[45px] h-[45px] rounded-[50%]' alt="" />
                                    <div className="ml-[8px]">
                                        <p className='text-[14px] font-bold'>azzzw_10</p>
                                        <p className='text-[13px] font-bold text-[#737373]'>Azizov S.</p>
                                    </div>
                                </div>
                                <button className='px-[20px] h-[32px] text-[13px] rounded-[10px] text-[white] font-bold bg-[#0095f6]'>Подписаться</button>
                            </div>
                        </div>
                    </div>
            </div>:""}
            <div className="w-[100%] flex md:hidden flex-wrap fixed">
                <div className='w-[100%] bg-[white] flex justify-center  items-center border-b-[1px] border-b-gray-300'>
                    <div className="w-[90%] h-[50px] flex justify-between items-center">
                        <img src={getImage.logo} className='h-[30px]' alt="" />
                        <div className="flex">
                            <Icon2 icon={<AddBoxOutlinedIcon style={{fontSize:"25px"}} link="/" />}/>
                            <div className="w-[10px]"></div>
                            <Icon2 icon={<FavoriteBorderOutlinedIcon style={{fontSize:"25px"}} link="/" />}/>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] mt-[85vh] flex justify-center bg-[white]   items-center border-t-[1px] border-t-gray-300">
                    <div className="w-[83%] h-[50px] flex justify-between items-center">
                        <Icon2 icon={<HomeIcon style={{fontSize:"35px"}} link="/" />}/>
                        <Icon2 icon={<SearchOutlinedIcon style={{fontSize:"30px"}} link="/" />}/>
                        <Icon2 icon={<MovieOutlinedIcon style={{fontSize:"30px"}} link="/" />}/>
                        <Icon2 icon={<MessageOutlinedIcon style={{fontSize:"30px"}} link="/" />}/>
                        <Icon2 icon={<AccountCircleOutlinedIcon style={{fontSize:"30px"}} link="/" />}/>
                    </div>
                </div>
            </div>
            <Outlet/>


   
        </div>
    )
}

export default Layout
