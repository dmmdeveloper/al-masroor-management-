import React from 'react'
import { useParams } from 'react-router-dom'

function SingleMember() {
    const {id}  = useParams()

  return (<>
  <div className="min-h-screen h-auto bg-black w-full  text-white">
    {id}
  </div>
  </>  )
}

export default SingleMember