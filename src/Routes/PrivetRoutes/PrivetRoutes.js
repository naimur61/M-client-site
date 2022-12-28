import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Hooks/Auth/useAuth';
// import { Loader } from '../../Pages/Shared/Loader/Loader';

const PrivetRoutes = ({ children }) => {
   const { loading, user } = useAuth();
   const location = useLocation();

   if (loading) {
      return <h1>......</h1>;
   }

   if (user || user?.uid) {
      return children;
   }

   return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivetRoutes;