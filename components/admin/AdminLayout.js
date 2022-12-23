

import AdminSideBar from './AdminSideBar'

function AdminLayout({ children }) {
    return (
        <div className='flex '>
            <AdminSideBar />
            {children}
        </div>
    )
}

export default AdminLayout