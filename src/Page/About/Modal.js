import React from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ user, university, address }) => {
   const imageHostKey = process.env.REACT_APP_imgbb_key;
   const { register, handleSubmit, formState: { errors }, reset } = useForm();


   const onSubmit = (data, e) => {
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
            // console.log(imgData.data.url);

            if (imgData) {
               const userObj = {
                  displayName: data.name,
                  photoURL: imgData.data.url,
                  university: data.university,
                  address: data.address
               };
               fetch('http://localhost:5000/users', {
                  method: 'POST',
                  headers: {
                     'content-type': 'application/json'
                  },
                  body: JSON.stringify(userObj)
               })
            }
         })
   };


   return (
      <div>
         <input type="checkbox" id="aboutModal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label htmlFor="aboutModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
               <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
               <form onSubmit={handleSubmit(onSubmit)}>

                  {/* Name */}
                  <span className="label-text font-semibold">Enter Your Full Name</span>
                  <input type='text' defaultValue={user?.displayName} {...register("name", { required: true })} className="input input-bordered w-full  block  mb-2" />
                  {/* errors will return when field validation fails  */}
                  {errors.name && <small className='block bg-red-300 px-4 mt-1 mb-4  py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> Name must be required</small>}



                  {/* University Name */}
                  <span className="label-text font-semibold">Enter Your University Name</span>
                  <input type='text' defaultValue={university} {...register("university", { required: true })} className="input input-bordered w-full  block  mb-2" />
                  {/* errors will return when field validation fails  */}
                  {errors.university && <small className='block bg-red-300 px-4 mt-1 mb-4  py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> University Name must be required</small>}


                  {/* Address */}
                  <span className="label-text font-semibold">Enter Your Address</span>
                  <input type='text' defaultValue={address} {...register("address", { required: true })} className="input input-bordered w-full  block  mb-2" />
                  {/* errors will return when field validation fails  */}
                  {errors.address && <small className='block bg-red-300 px-4 mt-1 mb-4  py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> Address must be required</small>}



                  {/* Email  */}
                  <span className="label-text font-semibold">Enter Your Email</span>
                  <input defaultValue={user?.email} type='email' {...register("email", { required: true })} className="input input-bordered w-full  block  mb-2" />
                  {errors.email && <small className='block bg-red-300 px-4 mt-1 mb-4 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>Email must be required</small>}

                  <button type="submit" className=' w-fit btn btn-sm bg-blue-600 hover:bg-blue-700 my-3 block'>Update</button>

               </form>
            </div>
         </div>
      </div>
   );
};

export default Modal;