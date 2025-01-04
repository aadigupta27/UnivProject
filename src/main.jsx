import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/layout.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/subComponent/Dashboard.jsx';
import Forms from './components/subComponent/Forms.jsx';
import { AppProvider } from './components/subComponent/AppContext.jsx';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path=":departmentId" element={<Dashboard />} />
      <Route path=":departmentId/:formId" element={<Forms />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={Router} /> 
    </AppProvider>
  </StrictMode>
);
