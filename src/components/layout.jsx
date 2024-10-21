import React from 'react'
import Header from './subComponent/Header'
import Footer from './subComponent/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
