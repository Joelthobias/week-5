import React from 'react';
import ReactDOM from 'react-dom/client';
import PhoneVerification from './PhoneVerification';
import PincodeLookup from './pincodeLookUp'; 
import EmailVerification from './emailverification';
import Home from './home'; 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  }, {
    path: "/phone",
    element: <PhoneVerification />,
  }, {
    path: "/pincode",
    element: <PincodeLookup />,
  }, {
    path: "/email",
    element: <EmailVerification />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


