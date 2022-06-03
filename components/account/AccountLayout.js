

import React from 'react'
import AccountSideBar from './AccountSideBar'

function AccountLayout({ children }) {
    return (
        <div className='flex flex-1 min-h-[80vh]'>
            <AccountSideBar />
            {children}
        </div>
    )
}

export default AccountLayout