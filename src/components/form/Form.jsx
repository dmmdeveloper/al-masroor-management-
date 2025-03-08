import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, clearError } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';


function Form() {
  const dispatch = useDispatch()
  const [code , setCode]  =useState('')

  const naviate = useNavigate()
  const verify  = (e)=>{
    e.preventDefault();
    // call your action here
    dispatch(authenticate(code));
  }
  const {errorMessage ,isAuthenticated } = useSelector(store => store.auth); 

  useEffect(() => {
    if(isAuthenticated){
      naviate('/'); 
    }
  } , [isAuthenticated])

  return (<>
  <div className="h-screen w-full bg-black fixed top-0 flex justify-center  items-center">
    <form  onSubmit={verify} className="h-auto p-6 w-[90%] md:w-[400px] rounded-lg border-appYellow border bg-halfBlack">
      <div className="flex flex-col gap-3">
      <label htmlFor="" className=' text-white text-3xl'>Enter Password</label>
      <div className="">
      <input onFocus={()=>dispatch(clearError())} value={code} onChange={(e)=>setCode(e.target.value)} type="text" className={ `bg-transparent ${errorMessage ?"border-red-600 text-red-700" :""}  border-appYellow  outline-none border rounded-lg p-3 text-2xl text-appYellow `} />
      {
        errorMessage &&
        <p className='text-red-600 italic text-xl' >Invalid Password</p>

      }
      </div>
      <p className='flex gap-2 text-2xl text-appYellow select-none'>
        <input type="checkbox" className='scale-150 accent-appYellow' name="" id="show-password" />
        <label htmlFor="show-password">Show Password</label>
      </p>
      </div>
      {/* Submit */}
      <div className="mt-5">
        <button className='bg-white w-full text-2xl text-appYellow rounded-lg  p-3' >Verify</button>
      </div>
    </form>

  </div>
    


    
    </>
  )
}
export default Form;