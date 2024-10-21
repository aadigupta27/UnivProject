import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/layout.jsx'
import Home from './components/Home.jsx'
import IETdashboard from './components/IETdashboard.jsx'
import IIPSdept from './components/IIPSdept.jsx'
import IMSdept from './components/IMSdept.jsx'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>} />
      <Route path='iet@123' element={<IETdashboard/>} />
      <Route path='iips@123' element={<IIPSdept/>} />
      <Route path='ims@123' element={<IMSdept/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
)
