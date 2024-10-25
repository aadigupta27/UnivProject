import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/layout.jsx'
import Home from './components/Home.jsx'
import IETdashboard from './components/subComponent/IET/IETdashboard.jsx'
import IIPSdept from './components/subComponent/IIPS/IIPSdept.jsx'
import IMSdept from './components/subComponent/IMS/IMSdept.jsx'
import IIPSforms from './components/subComponent/IIPS/IIPSforms.jsx'
import IMSforms from './components/subComponent/IMS/IMSforms.jsx'
import IIPSformRes from './components/subComponent/IIPS/IIPSformRes.jsx'
import IETformRes from './components/subComponent/IET/IETformRes.jsx'
import IMSformRes from './components/subComponent/IMS/IMSformRes.jsx'
import IETform1 from './components/subComponent/IET/IETform1.jsx'
import IETform2 from './components/subComponent/IET/IETform2.jsx'
import IETform3 from './components/subComponent/IET/IETform3.jsx'
import IETform4 from './components/subComponent/IET/IETform4.jsx'
import IETform5 from './components/subComponent/IET/IETform5.jsx'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>} />
      <Route path='iet@123' element={<IETdashboard/>}/>
      <Route path='iet@123/form1' element={<IETform1 />} />
      <Route path='iet@123/form2' element={<IETform2 />} />
      <Route path='iet@123/form3' element={<IETform3 />} />
      <Route path='iet@123/form4' element={<IETform4 />} />
      <Route path='iet@123/form5' element={<IETform5 />} />
      <Route path='iet@123/form/response' element={<IETformRes/>}/>
      <Route path='iips@123' element={<IIPSdept/>} />
      <Route path='iips@123/form' element={<IIPSforms/>} />
      <Route path='iips@123/form/response' element={<IIPSformRes/>}/>
      <Route path='ims@123' element={<IMSdept/>} />
      <Route path='ims@123/form' element={<IMSforms/>}/>
      <Route path='ims@123/form/response' element={<IMSformRes/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
)
