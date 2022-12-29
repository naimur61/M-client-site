import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import '../Login.css'




const Login = () => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const { userLogin, popupSignIn, googleProvider, resetPassword } = useAuth();
   const location = useLocation();
   const navigate = useNavigate();
   const from = location.state?.from?.pathname || '/';
   const [userEmail, setUserEmail] = useState('');


   const onSubmit = (data, e) => {
      userLogin(data.email, data.password)
         .then(result => {
            setUserEmail(data?.email);
            successToast('Login Successful.')
            reset();
            navigate(from, { replace: true })
         })
         .catch(er => {
            errorToast(er.message)
         })
      // console.log(data);
   };


   // Google SignIn
   const googleSignIn = () => {
      popupSignIn(googleProvider)
         .then(result => {
            const user = result.user;
            navigate(from, { replace: true })
         })
         .catch(er => errorToast(er.message))
   }

   // resetPassword
   // const handleResetPassword = (data) => {
   //    console.log(data);

   // }




   // Toast 
   const successToast = (er) => {
      toast.success(er, {
         position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }
   const errorToast = (er) => {
      toast.error(er, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }



   return (
      <div className=' login-form'>
         <div className='flex justify-end mt-4 mr-5 md:mr-14'><Link to='/' className='font-bold text-4xl ' style={{ fontFamily: '"Permanent Marker", cursive', color: '#E11244' }}>X</Link></div>

         <div className='px-5 md:px-0 mt-12'>
            <div className="card md:w-96  bg-base-100 shadow-xl mx-auto">
               <div className="card-body">
                  <h1 className='text-info font-serif font-bold text-3xl mb-2 text-center'>Login</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     {/* register your input into the hook by invoking the "register" function */}
                     <span className="label-text font-semibold">Email</span>
                     <input type='email' placeholder="Enter your email." {...register("email", { required: true, pattern: /@/ })} className="input input-bordered w-full  block  mb-3" />   {/* errors will return when field validation fails  */}
                     {errors.email && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> This field is required</small>}

                     {/* include validation with required or other standard HTML validation rules */}
                     <span className="label-text font-semibold">Password</span>
                     <input placeholder='Password' type='password' {...register("password", { required: true, minLength: 6 })} className="block input input-bordered w-full" />
                     {/* errors will return when field validation fails  */}
                     {errors.password && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> This field is required</small>}
                     <p className='text-blue-700 font-semibold text-xs cursor-pointer'>Forgot Password ?</p>


                     <button type="submit" className="btn btn-info font-bold font-serif text-white hover:bg-cyan-600 block  my-3 w-full">Login</button>
                     <small className='text-center block'><Link to='/signup' className='text-info font-semibold'>Create Account ?</Link></small>
                     <div className="divider">OR</div>

                  </form>
                  <button onClick={googleSignIn} className="btn btn-outline btn-info  w-full">CONTINUE WITH GOOGLE</button>
               </div >
               <ToastContainer />
            </div>
         </div>
      </div>
   );
};

export default Login;