import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Page/Shared/Footer/Footer';
import Navbar from '../../Page/Shared/Navbar/Navbar';

const Main = () => {
   return (
      <div className='mx-auto container w-full md:w-8/12 lg:w-6/12'>
         <Navbar />
         <Outlet />
         <Footer />
      </div>
   );
};

export default Main;