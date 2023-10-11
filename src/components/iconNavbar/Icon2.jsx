import React from 'react'
import { Link } from 'react-router-dom'

const Icon2 = (obj) => {
  return (
    <Link to={obj.link}>
        <div className="w-[50px] h-[50px] flex justify-center items-center">
            {obj.icon}
        </div>
    </Link>
  )
}

export {Icon2}