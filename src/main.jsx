import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/layout.jsx'
import Home from './components/Home.jsx'
import IETdashboard from './components/subComponent/IET/IETdashboard.jsx'
import IIPSdept from './components/subComponent/IIPS/IIPSdept.jsx'
import IMSdept from './components/subComponent/IMS/IMSdept.jsx'
import IETforms from './components/subComponent/IET/IETforms.jsx'
import IIPSforms from './components/subComponent/IIPS/IIPSforms.jsx'
import IMSforms from './components/subComponent/IMS/IMSforms.jsx'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>} />
      <Route path='iet@123' element={<IETdashboard/>}>
        <Route path='form' element={<IETforms />} />
      </Route>
      <Route path='iips@123' element={<IIPSdept/>}>
        <Route path='form' element={<IIPSforms/>} />
      </Route>
      <Route path='ims@123' element={<IMSdept/>}>
        <Route path='form' element={<IMSforms/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
)
