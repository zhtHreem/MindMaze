import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RiddlePage from './Components/riddle';
import './index.css';
import App from './App';
import FunFactGenerator from './Components/funfact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/riddle',
    element: <RiddlePage />,
  },
   {
    path: '/funfact',
    element: <FunFactGenerator />,
  },
  
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <RouterProvider router={router} />
);