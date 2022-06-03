import axios from "axios"
import create from 'zustand'


const store_ = create(set => ({
    userId: '62822059f4ad8a31e8cbd6db',
    display: 'packing',
    set: data => set(data)
}))

const baseUrl = '/api/transaction/'
export default function useTransaction() {
    const { set, userId, transactions, selectedTransactions, display } = store_()


    const getTransactions = async () => {
        const res = await axios.get(baseUrl + '?userId=' + userId)
        set({ transactions: res.data, })
        setDisplay('all', res.data)
    }

    const cancelOrder = async (id) => {
        const res = await axios.delete(baseUrl + id + `?type=cancel`)
        console.log(res.data)
        const transactions_ = transactions?.map(
            t => t?._id == res.data?._id ? res.data : t)
        set({ transactions: transactions_ })
        setDisplay(display, transactions_)
    }

    const removeItem = async (id) => {
        const res = await axios.delete(baseUrl + id + `?type=remove`)
        const transactions_ = transactions?.filter(p => p?._id != id)
        set({ transactions: transactions_ })
        setDisplay(display, transactions_)
    }

    const setDisplay = (value, transactions_ = transactions) => {
        switch (value) {
            case 'All':
                return set({ selectedTransactions: transactions_, display: 'packing' })
            case 'To Ship':
                return set({ selectedTransactions: transactions_?.filter(p => p.status === 'shiping' && p.canceled == false), display: 'shiping' })
            case 'To Recieve':
                return set({ selectedTransactions: transactions_?.filter(p => p.status === 'receiving' && p.canceled == false), display: 'receiving' })
            case 'Completed':
                return set({ selectedTransactions: transactions_?.filter(p => p.status === 'completed' && p.canceled == false), display: 'completed' })
            case 'Canceled':
                return set({ selectedTransactions: transactions_?.filter(p => p.canceled == true), display: 'canceled' })
        }
    }




    return {
        transactions, selectedTransactions,
        getTransactions, cancelOrder, setDisplay, removeItem,
    }
}