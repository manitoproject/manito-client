import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GlobalStyle from './styles/global';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <GlobalStyle />
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
