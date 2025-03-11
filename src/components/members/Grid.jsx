import React, { useEffect } from "react";
import Card from "./Card";
import {useDispatch, useSelector} from "react-redux"
import { fetchMembers } from "../../store/slices/membersSlice.js";

function Grid() {
  const dispatch = useDispatch();
  const {members , membersLoading  ,membersError} =  useSelector( store => store.members)  
  console.log(members[0]);
  

  useEffect(()=>{
    if(!members.length){
      dispatch(fetchMembers())
    }
  } , []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4">
      {
        membersError? 
        <h1>Error</h1>
        :(
          membersLoading ? 
          
          Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton/>
              ))
          :   members?.map((member, index) => (
            <Card index={index} photo ={member?.photo} name={ member?.name} post={member?.work_post}  to={member?._id}/>
              ))

        )      }

   

    </div>
  );
}
export default Grid;

const CardSkeleton = () => {
  return (
    <div className="bg-halfBlack md:min-h-[300px] h-auto pb-3 min-h-[200px] md:p-1 p-[2px] rounded-md md:rounded-lg animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full rounded-t-md md:rounded-t-lg h-[70%] md:h-[80%] bg-gray-900"></div>

      {/* Text Skeleton */}
      <figcaption className="text-center mt-1 md:mt-3">
        <div className="bg-appYellow opacity-30 h-4 w-[90%] mx-auto rounded-md"></div>
        <div className="bg-white opacity-30 h-2 w-28 mx-auto rounded-md mt-2"></div>
      </figcaption>
    </div>
  );
};

