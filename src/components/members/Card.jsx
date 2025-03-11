import React from 'react'
import { Link } from 'react-router-dom'

function Card({name , index  , photo , post , to }) {
  return (
    <Link  to={`member/${to}`}>
    <div key={index} className="bg-halfBlack md:h-[350px] h-[200px] cursor-pointer hover:border hover:border-appYellow hover:relative hover:bottom-1 text-white md:p-1 p-[2px] rounded-md md:rounded-lg">
        <img className='w-full  rounded-t-md md:rounded-t-lg  h-[70%] md:h-[80%]' src={photo} alt={`${name}'s Photo`} />
        <figcaption className='text-center mt-1 md:mt-3' > 
            <h2 className='text-appYellow text-xl md:text-2xl'>{name}</h2>
            <p className='md:text-[17px] text-[15px]' >{post}</p>
        </figcaption>
  </div>
  </Link>

  )
}

export default Card