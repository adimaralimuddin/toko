



import Todos from '../../../models/TodosModel';
import dbConnect from '../../../utils/connectMongoose'

export default async function (req, res) {
    const { method, body, query: { id } } = req
    dbConnect();

    if (method === 'GET') {
        try {
            const todos = await Todos.findById(id)
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if (method === 'DELETE') {
        try {
            await Todos.findByIdAndDelete(id)
            res.status(200).json()
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if (method === 'PUT') {
        try {
            await Todos.findByIdAndUpdate(id, body)
            const todo = await Todos.findById(id)
            res.status(200).json(todo)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}