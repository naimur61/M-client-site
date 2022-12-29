import React from 'react';
import { useLoaderData } from 'react-router-dom';
import dp from '../../../assets/icon/look.jpg'
import { FaGlobeAmericas, FaRegCommentAlt, } from 'react-icons/fa';
import { SlLike } from 'react-icons/sl';
import { RiMore2Fill } from 'react-icons/ri';
import DetailsComment from './DetailsComment';



const Details = () => {
   const post = useLoaderData();
   const { img, content, reaction, comments, _id } = post
   return (
      <div className='flex justify-between gap-5 my-10'>
         <div className='w-full'>
            <img src={img} alt="" />
         </div>


         <div className='w-full'>
            {/* header  */}
            <div className='px-3 mt-3 flex justify-between items-center'>

               <div className='flex items-stretch gap-3'>
                  <img src={dp} alt="" className='w-10 rounded-full block' />
                  <div>
                     <h3 className=' font-bold'> Naimur</h3>
                     <div className='flex gap-2 items-center -mt-2 '>
                        <p className='text-sm font-semibold'>4 h </p>
                        <p className='font-extrabold'>.</p>
                        {/* <p className=' text-sm font-semibold' >{monthNames[new Date(date).getMonth()]}</p> */}
                        < FaGlobeAmericas className=' text-sm font-bold -mb-1' />
                     </div>
                  </div>
               </div>

               <RiMore2Fill className='text-xl cursor-pointer' />
            </div>

            {/* Details  */}
            <div className='px-3 my-3 w-full'>
               <div className=' max-w-prose'>{content}</div>
            </div>

            {/* Footer  */}
            <div className='px-3 m-3'>
               <div className='flex justify-between mb-2'>
                  <p className='cursor-pointer hover:underline '>{reaction ? reaction : '0'} people</p>
                  <p className='cursor-pointer hover:underline '>{comments?.length} comments</p>
               </div>
               <hr />
               <div className='flex justify-between m-2'>
                  <div className='flex items-center gap-2 cursor-pointer '>
                     < SlLike className={` hover:scale-110 'text-blue-600 scale-110`} />
                     <strong >Like</strong>
                  </div>
                  <div className='flex items-center gap-2 cursor-pointer'>
                     < FaRegCommentAlt />
                     <strong>Comment</strong>
                  </div>
               </div>
               <DetailsComment comments={comments} _id={_id} />
            </div>
         </div>
      </div>
   );
};

export default Details;