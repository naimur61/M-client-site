import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../Hooks/Auth/useAuth';


const Comments = ({ comments, _id }) => {
   const { register, handleSubmit, reset } = useForm();
   const { user } = useAuth();
   const navigate = useNavigate();
   let newObj = comments;


   const onSubmit = data => {
      if (!(user || user?.uid)) {
         return navigate('/login');
      }
      const obj = {
         commentTxt: data?.comment,
         displayName: user?.displayName,
         photoURL: user?.photoURL,
         email: user?.email,
      };
      if (!comments || (comments === null || undefined)) {
         newObj = [obj]
      } else {
         newObj.push(obj)
      }

      fetch(`https://m-server-pi.vercel.app/postComments/${_id}`, {
         method: 'PUT',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify(newObj)
      })
         .then(res => res.json())
         .then(data => {
            if (data.acknowledged === true) {
               reset();
            }
         })

   };

   return (
      <div>
         <hr />
         <div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">

               <div className='mt-3 grid grid-cols-12 items-center px-2 justify-between'>
                  <img src={user?.photoURL} alt="" className='w-10 rounded-full block col-span-2 lg:col-span-1' />
                  <input className="input input-bordered rounded-3xl w-full block col-span-10 lg:col-span-11" placeholder="Write a comment..." {...register("comment", { required: true })} />
               </div>

               <div className=' flex justify-end mt-2 mr-5'><button
                  type="submit" className='btn btn-xs bg-blue-600 text-white font-semibold border-0 text-xs rounded hover:bg-blue-700' >Post</button></div>
            </form>
         </div>

         <div>

            {comments &&
               <div className='mt-3 grid grid-cols-12 items-start px-7 justify-between'>
                  <img src={user?.photoURL} alt="" className='w-8 rounded-full block mt-1 col-span-2 lg:col-span-1' />
                  <div className="border px-5 py-2 rounded-3xl w-fit block col-span-10 lg:col-span-11" >
                     <h3 className='font-bold text-md'>{comments[0]?.displayName}</h3>
                     <p className='text-sm'>{comments[0]?.commentTxt}</p>
                  </div>
               </div>
            }

         </div>


      </div>
   );
};

export default Comments;