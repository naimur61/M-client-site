import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';



const Home = () => {
   const imageHostKey = process.env.REACT_APP_imgbb_key;
   const navigate = useNavigate();

   const { register, handleSubmit, formState: { errors }, reset } = useForm();

   const onSubmit = data => {
      const image = data.image[0];
      const formData = new FormData();
      formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
      fetch(url, {
         method: 'POST',
         body: formData,
      })
         .then(res => res.json())
         .then(imgData => {
            if (imgData) {
               const obj = {
                  content: data.content,
                  img: imgData.data?.url,
                  date: new Date(),
               };
               fetch('http://localhost:5000/posts', {
                  method: 'POST',
                  headers: {
                     'content-type': 'application/json'
                  },
                  body: JSON.stringify(obj)
               })
                  .then(res => res.json())
                  .then(data => {
                     if (data.acknowledged === true) {
                        reset();
                        navigate('/media');
                     }
                  })
            }

         });

   };
   return (
      <div>

         {/* Top section  */}
         <div className='text-center mt-20'>
            top post
         </div>

         {/* Text field  */}
         <div className=' shadow-lg border p-10 rounded-md my-20 flex flex-col items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
               <div className='mt-3'>

                  <textarea className="textarea textarea-bordered w-full" placeholder="What's your mind', Naimur' ?" {...register("content", { required: true })} ></textarea>
                  {errors.content && <span className='text-red-700 font-semibold block'>This field is required</span>}
               </div>
               <label className="block m-5 mx-auto w-fit">
                  <span className="sr-only">Choose photo</span>
                  <input type="file"
                     className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
                     {...register("image", { required: true })} />
                  {errors.image && <span className='text-red-700 font-semibold block'>This field is required</span>}
               </label>

               <div className='w-fit mx-auto mt-8'><button type="submit" className='btn btn-sm'>Post</button></div>
            </form>
         </div>
      </div>
   );
};

export default Home;