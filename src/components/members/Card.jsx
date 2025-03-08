import React from 'react'
import { Link } from 'react-router-dom'

function Card({name , index  , img }) {
  return (
    <Link>
    <div key={index} className="bg-halfBlack  cursor-pointer hover:border hover:border-appYellow hover:relative hover:bottom-1 text-white md:p-1 p-[2px] rounded-md md:rounded-lg">
        <img className='w-full  rounded-t-md md:rounded-t-lg  h-[70%] md:h-[80%]' src={`https://res.cloudinary.com/dfyfvcrkd/image/upload/v1738309304/uploads/Hitesh_babo_ui3rxd.png`} alt="" />
        <figcaption className='text-center mt-1 md:mt-3' > 
            <h2 className='text-appYellow text-xl md:text-2xl'>Hitesh Choudhry </h2>
            <p className='md:text-[20px] text-[15px]' >Sofware Developer</p>
        </figcaption>



  </div>
  </Link>

  )
}

export default Card