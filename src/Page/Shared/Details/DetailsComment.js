import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../../Hooks/Auth/useAuth';


const DetailsComment = ({ comments, _id }) => {
   const { user } = useAuth();
   const { register, handleSubmit, reset } = useForm();
   let newObj = comments;

   const onSubmit = data => {
      const obj = {
         commentTxt: data?.comment,
         displayName: user?.displayName,
         photoURL: user?.photoURL,
         email: user?.email,
      };
      // newObj.push(obj);
      if (!comments || (comments === null || undefined)) {
         newObj = [obj]
      } else {
         newObj.push(obj)
      }

      fetch(`http://localhost:5000/postComments/${_id}`, {
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

         {comments &&
            comments.map((cm, i) => <div key={i} className='mt-5 grid grid-cols-12 items-start px-7 justify-between'>
               <img src={user?.photoURL} alt="" className='w-8 rounded-full block mt-1 col-span-2' />
               <div className="border px-5 py-2 rounded-3xl w-fit block col-span-10" >
                  <h3 className='font-bold text-md'>{cm?.displayName}</h3>
                  <p className='text-sm'>{cm?.commentTxt}</p>
               </div>
            </div>)
         }


         <div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">

               <div className='mt-3 grid grid-cols-12 items-center px-2 justify-between'>
                  <img src={user?.photoURL} alt="" className='w-10 rounded-full block col-span-2' />
                  <input className="input input-bordered rounded-3xl w-full block col-span-10" placeholder="Write a comment..." {...register("comment", { required: true })} />
               </div>

               <div className=' flex justify-end mt-2 mr-5'><button
                  type="submit" className='btn btn-xs bg-blue-600 text-white font-semibold border-0 text-xs rounded hover:bg-blue-700' >Post</button></div>
            </form>
         </div>
      </div>
   );
};

export default DetailsComment;