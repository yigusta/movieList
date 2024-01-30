import React from 'react'
import { Link } from 'react-router-dom'
import { BiSolidMoviePlay } from "react-icons/bi";
const Header = () => {
  return (
   <nav style={{backgroundColor:"#12372A "}} className='py-3 border-b border-[#ADBC9F]  '>
    <div className='ml-5 flex gap-3 px-5 '>
        <Link to={"/"} className='mt-2' >
            
        <div style={{color:"#FBFADA"}}  className='flex my-5 items-center text-xl  font-semibold'><BiSolidMoviePlay/> Filmler</div>
        </Link>
      
    </div>

  
   </nav>
  )
}

export default Header