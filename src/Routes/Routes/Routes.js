import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main/Main';
import About from '../../Page/About/About';
import Login from '../../Page/Authentication/Login/Login';
import SignUp from '../../Page/Authentication/SignUp/SignUp';
import Home from '../../Page/Home/Home';
import Media from '../../Page/Media/Media';
import Message from '../../Page/Message/Message';
import Details from '../../Page/Shared/Details/Details';
import PrivetRoutes from '../PrivetRoutes/PrivetRoutes';



export const Routes = createBrowserRouter([

   // Main Layout 
   {
      path: '/', element: <Main />, children: [
         { path: '/', element: <Home /> },
         { path: '/home', element: <Home /> },
         { path: '/media', element: <Media /> },
         { path: '/message', element: <Message /> },
         { path: '/about', element: <PrivetRoutes><About /></PrivetRoutes> },
         { path: '/details/:id', element: <PrivetRoutes><Details /></PrivetRoutes>, loader: ({ params }) => fetch(`https://m-server-pi.vercel.app/posts/${params.id}`) },

      ]
   },

   { path: '/login', element: <Login /> },
   { path: '/signup', element: <SignUp /> },

])

