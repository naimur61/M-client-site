import React from 'react';
import { useForm } from "react-hook-form";
import dp from '../../assets/icon/look.jpg'


const Comments = () => {
   const { register, handleSubmit, reset } = useForm();

   const onSubmit = data => {
      console.log(data);
      reset();
   };

   return (
      <div>
         <hr />
         <div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">

               <div className='mt-3 grid grid-cols-12 items-center px-2'>
                  <img src={dp} alt="" className='w-10 rounded-full block col-span-1' />
                  <input className="input input-bordered rounded-3xl w-full block col-span-11" placeholder="Write a comment..." {...register("comment", { required: true })} />
               </div>
            </form>
         </div>

      </div>
   );
};

export default Comments;