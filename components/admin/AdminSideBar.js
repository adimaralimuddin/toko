
import Link from 'next/link'
import React from 'react'

function AdminSideBar() {
    return (
        <div className='flex flex-col'>
            <Link href='/admin/'>dashboard</Link>
            <Link href='/admin/add-product'>Add Product</Link>
        </div>
    )
}

export default AdminSideBar