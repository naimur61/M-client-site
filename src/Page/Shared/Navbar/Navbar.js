import React from 'react';
import { CgFeed } from 'react-icons/cg';
import { BsPersonCircle } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo_i from '../../../assets/icon/logo.png'
import logout_i from '../../../assets/icon/logout.svg'
import editor_i from '../../../assets/icon/editor.svg'
import { useAuth } from '../../../Hooks/Auth/useAuth';

const Navbar = () => {
   const { user, userLogout } = useAuth();

   const handlerLogout = () => {
      userLogout()
         .then(() => { })
         .catch(error => console.error(error))
   }



   return (
      <div className="navbar bg-base-100">
         <div className="flex-1">
            <Link to='/'><img src={logo_i} alt="" className='w-10 lg:w-16' /></Link>
         </div>
         <div className="flex-none">
            <Link to='/home' className="btn btn-square btn-ghost btn-sm mr-3">
               < AiFillHome className=' text-2xl' />
            </Link>
            <Link to='/media' className="btn btn-square btn-ghost btn-sm mr-3">
               < CgFeed className=' text-2xl' />
            </Link>
            <Link to='/message' className="btn btn-square btn-ghost btn-sm mr-3">
               < RiMessage2Fill className=' text-2xl' />
            </Link>
            <Link to='/about' className="btn btn-square btn-ghost btn-sm mr-3"><img className='w-5' src={editor_i} alt="" /></Link>
            <>
               {(user || user?.uid) ?
                  <div className="dropdown dropdown-end mr-3">
                     <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                           {
                              (user?.photoURL !== null) ?
                                 <img src={user?.photoURL
                                 } alt='' />
                                 :
                                 <BsPersonCircle className=' text-2xl' />
                           }
                        </div>
                     </label>
                     <ul tabIndex={0} className="mt-3 p-2  menu menu-compact dropdown-content bg-base-100 shadow-lg rounded-box w-44">
                        <li><Link to='/login' onClick={handlerLogout} ><img className='w-5' src={logout_i} alt="" />Logout</Link></li>
                     </ul>
                  </div>
                  :
                  <div className="w-10 rounded-full">
                     <Link to='/login'><BsPersonCircle className=' text-2xl' /></Link>
                  </div>
               }
            </>
         </div>
      </div>
   );
};

export default Navbar;