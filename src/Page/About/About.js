import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../Hooks/Auth/useAuth';
import edit from '../../assets/icon/user.png'
import Modal from './Modal';
import { ScaleLoader } from 'react-spinners';


const About = () => {

   const { user } = useAuth();

   const { data: users = [], refetch, isLoading } = useQuery({
      queryKey: "user",
      queryFn: async () => {
         const res = await fetch(`https://m-server-pi.vercel.app/users/?email=${user?.email}`);
         const data = await res.json();
         return data;
      }
   })
   const { university, address, _id } = users;
   refetch();

   if (isLoading) {
      return <div className=' h-screen flex justify-center items-center'><ScaleLoader color="#36d7b7" className='text-5xl' /></div>;
   }

   return (
      <div className='flex md:justify-between flex-col md:flex-row px-2 md:px-0 gap-5 my-20 h-screen'>
         <div className='w-full'><img src={user?.photoURL} alt="" /></div>
         <div className='w-full'>
            <div className=' flex gap-3'>
               <h3 className='text-2xl font-bold'>Name : {user?.displayName}</h3>
               <label htmlFor="aboutModal" className='btn btn-square btn-ghost btn-sm w-6 h-3'><img src={edit} alt="" /></label>
            </div>
            <p className='text-sm text-gray-600 font-bold'> Email : {user?.email}</p>
            <p className='mt-3 font-semibold'>University : {university} </p>
            <p className=' font-semibold'>Address : {address}</p>
         </div>

         {/* Put this part before </body> tag */}
         <Modal user={user} address={address} university={university} id={_id} />
      </div>
   );
};

export default About;