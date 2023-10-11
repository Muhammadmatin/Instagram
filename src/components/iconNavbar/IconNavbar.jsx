import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { handleChange } from '../../todos/todos'

const IconNavbar = (obj) => {
    const special = useSelector((store)=> store.todos.special)
    

    return (
        <div
            style={{width:special?"50px":"215px"}}
            className='h-[48px] w-[215px] mt-[5px] flex items-center hover:bg-[#eeeeee] rounded-[10px]'>
            {obj.icon1}
            {!special?<p className='hidden lg3:flex text-[16px]'>{obj.text}</p>:""}
        </div>
    )
}

export default IconNavbar
