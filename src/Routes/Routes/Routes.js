import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main/Main';
import About from '../../Page/About/About';
import Home from '../../Page/Home/Home';
import Media from '../../Page/Media/Media';
import Message from '../../Page/Message/Message';



export const Routes = createBrowserRouter([

   // Main Layout 
   {
      path: '/', element: <Main />, children: [
         { path: '/', element: <Home /> },
         { path: '/home', element: <Home /> },
         { path: '/media', element: <Media /> },
         { path: '/message', element: <Message /> },
         { path: '/about', element: <About /> },

      ]
   },

   // { path: '/login', element: <Login /> },
   // { path: '/signup', element: <SignUp /> },
])

