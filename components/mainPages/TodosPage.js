
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

function TodosPage({ todos }) {
    const [data, setData] = useState(todos)

    const refreshData = async () => {
        const res = await axios.get('/api/todos')
        setData(res.data)
    }

    return (
        <div>
            <TodosAdderView refreshData={refreshData} />
            <div>
                {
                    data?.map(todo => <TodoItemView todo={todo} refreshData={refreshData} key={todo?._id} />)
                }
            </div>
        </div>
    )
}

function TodoItemView({ todo, refreshData }) {

    const deleteHandler = async () => {
        await axios.delete(`/api/todos/${todo?._id}`)
        refreshData()
    }

    return (
        <div className='bg-gray-100 rounded-md p-5 m-2' >
            <Link href={`/todos/${todo?._id}`}>
                <div>
                    <p>{todo?.title}</p>
                    <p>{todo?.description}</p>
                </div>
            </Link>
            <button onClick={deleteHandler}>delete</button>
        </div>
    )
}

function TodosAdderView({ refreshData }) {

    async function onAddHandler(e) {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        await axios.post('/api/todos', { title, description })
        refreshData()
    }

    return (
        <div className='max-w-sm p-2 ring-1 rounded-md m-2'>
            <form onSubmit={onAddHandler} className='flex flex-col '>
                <input type="text" name='title' />
                <textarea name="description" id="" cols="10" rows="3"></textarea>
                {/* <button onClick={onAddHandler}>add</button> */}
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default TodosPage


