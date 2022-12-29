import React from 'react';
import { ScaleLoader } from 'react-spinners';




const Message = () => {
   return (
      <div className=' h-screen flex justify-center items-center'><ScaleLoader color="#36d7b7" className='text-5xl' /></div>
   );
};

export default Message;