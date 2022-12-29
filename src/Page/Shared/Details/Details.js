import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import dp from '../../../assets/icon/look.jpg'
import { FaGlobeAmericas, FaRegCommentAlt, } from 'react-icons/fa';
import { SlLike } from 'react-icons/sl';
import { RiMore2Fill } from 'react-icons/ri';
import DetailsComment from './DetailsComment';
import { useAuth } from '../../../Hooks/Auth/useAuth';



const Details = () => {
   const { user } = useAuth();
   const post = useLoaderData();
   const { img, content, reaction, comments, _id } = post



   const [like, setLike] = useState(false);

   const handleLike = () => {
      let react = '';
      if (reaction === undefined || reaction === 0) {
         react = 1;
      }
      else if (like === false) {
         react = (+reaction) + 1;
      }
      else {
         react = (+reaction) - 1;
      }

      fetch(`http://localhost:5000/postLike/${_id}`, {
         method: 'PUT',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ react })
      })
         .then(res => res.json())
         .then(data => {
            if (data.acknowledged === true) {
               setLike(!like);
            }
         })
   };


   return (
      <div className='flex justify-between gap-5 my-10'>
         <div className='w-full'>
            <img src={img} alt="" />
         </div>


         <div className='w-full'>
            {/* header  */}
            <div className='px-3 mt-3 flex justify-between items-center'>

               <div className='flex items-stretch gap-3'>
                  <img src={user?.photoURL} alt="" className='w-10 rounded-full block' />
                  <div>
                     <h3 className=' font-bold'> {user?.displayName}</h3>
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
                  <div onClick={handleLike} className='flex items-center gap-2 cursor-pointer '>
                     < SlLike className={` hover:scale-110 ${like ? 'text-blue-600 scale-110' : undefined} `} />
                     <strong className={`${like ? 'text-blue-600' : undefined} `} >Like</strong>
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