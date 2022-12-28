import React, { useState } from 'react';
import dp from '../../assets/icon/look.jpg'
import { FaGlobeAmericas, FaRegCommentAlt, } from 'react-icons/fa';
import { SlLike } from 'react-icons/sl';
import { RiShareForwardLine, RiMore2Fill } from 'react-icons/ri';
import { format } from "date-fns";
import Comments from './Comments';
import { id } from 'date-fns/locale';



const PostCard = ({ post }) => {
   const { date, img, _id, reaction } = post;
   // const postTime = format(new Date(date), "PP");
   const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];


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

   const [comments, setComments] = useState(false);

   const handleComments = () => {
      setComments(!comments);
   };

   return (
      <>
         {
            post &&
            <div className='rounded-lg border shadow-lg mt-4 w-full'>
               {/* header  */}
               <div className='px-3 mt-3 flex justify-between items-center'>

                  <div className='flex items-stretch gap-3'>
                     <img src={dp} alt="" className='w-10 rounded-full block' />
                     <div>
                        <h3 className=' font-bold'> Naimur</h3>
                        <div className='flex gap-2 items-center -mt-2 '>
                           <p className='text-sm font-semibold'>4 h </p>
                           <p className='font-extrabold'>.</p>
                           <p className=' text-sm font-semibold' >{monthNames[new Date(date).getMonth()]}</p>
                           < FaGlobeAmericas className=' text-sm font-bold -mb-1' />
                        </div>
                     </div>
                  </div>

                  <RiMore2Fill className='text-xl cursor-pointer' />
               </div>

               {/* Details  */}
               <div className='px-3 my-3 w-full'>
                  <div className=' max-w-prose'>{post?.content}</div>
               </div>

               {post?.img &&
                  <img src={img} alt="" className='w-full h-64 md:h-96' />
               }

               {/* Footer  */}
               <div className='px-3 m-3'>
                  <div className='flex justify-between mb-2'>
                     <p className='cursor-pointer hover:underline '>{reaction ? reaction : '0'} people</p>
                     <p onClick={handleComments} className='cursor-pointer hover:underline '>10 comments</p>
                  </div>
                  <hr />
                  <div className='flex justify-between m-2'>
                     <div onClick={handleLike} className='flex items-center gap-2 cursor-pointer '>
                        < SlLike className={` hover:scale-110 ${like ? 'text-blue-600 scale-110' : undefined} `} />
                        <strong className={`${like ? 'text-blue-600' : undefined} `} >Like</strong>
                     </div>
                     <div onClick={handleComments} className='flex items-center gap-2 cursor-pointer'>
                        < FaRegCommentAlt />
                        <strong>Comment</strong>
                     </div>
                     <div className='flex items-center gap-2 cursor-pointer'>
                        < RiShareForwardLine className='  text-2xl' />
                        <strong>Details</strong>
                     </div>
                  </div>
                  {comments &&
                     <Comments />
                  }
               </div>
            </div>
         }
      </>
   );
};

export default PostCard;