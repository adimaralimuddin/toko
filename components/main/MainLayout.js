

import React from 'react'
import MainFooter from './MainFooter'
import MainHeader from './MainHeader'

function MainLayout({ children }) {
    return (
        <div className='bg-gray-50'>
            <MainHeader />
            {children}
            <MainFooter />
        </div>
    )
}

export default MainLayout