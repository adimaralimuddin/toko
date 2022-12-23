
import Link from 'next/link'

function AdminSideBar() {
    return (
        <div className='flex flex-col'>
            <Link href='/admin/'>dashboard</Link>
            <Link href='/admin/add-product'>Add Product</Link>
        </div>
    )
}

export default AdminSideBar