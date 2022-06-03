import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import create from 'zustand'

const url = '/api/products'

const initialState = {
    products: [],
    searchItems: [],
    // category: 'all',
    // title: '',
}

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => { state.products = action.payload },
        setSearchedItems: (state, action) => { state.searchItems = action.payload },

    }
})


const { setProducts, setSearchedItems,
    // setTitle_,
    //  setCategory_
} = ProductSlice.actions
export default ProductSlice.reducer

const store_ = create(set => ({
    title: '', category: 'all',
    isOpenSearchItems: false,
    set: data => set(data)
}))

export const useProduct = () => {
    const dispatch = useDispatch()
    const { products, searchItems } = useSelector(state => state.product)
    const { set, category, title, searching, isOpenSearchItems } = store_()

    const getMainProduct = async () => {
        const res = await axios.get(url)
        dispatch(setProducts(res.data || []))
    }

    const searchItem = async (title = title) => {
        set({ searching: true, title, isOpenSearchItems: true })
        dispatch(setSearchedItems([]))
        if (title == '') return
        const data = { title, category }
        const res = await axios.post(url + '?type=search', data)
        set({ searching: false })
        console.log(res.data)
        dispatch(setSearchedItems(res.data))
    }

    const getSearchItem = async () => {
        set({ searching: true })
        const data = { title, category }
        const res = await axios.post(url + '?type=get-search', data)
        set({ searching: false, isOpenSearchItems: false })
        console.log(res.data)
        dispatch(setProducts(res.data))
    }

    const setTitle = (title) => set({ title })
    const setCategory = (category) => set({ category })
    const setOpenSearchItems = (isOpenSearchItems) => set({ isOpenSearchItems })


    return {
        products,
        title, category, searchItems, searching,
        isOpenSearchItems,
        getMainProduct, searchItem, getSearchItem,
        setTitle, setCategory, setOpenSearchItems
    }
}