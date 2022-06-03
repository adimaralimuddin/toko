
import axios from 'axios'
import create from 'zustand'

const store_ = create(set => ({
    quantity: 1,
    userId: '62822059f4ad8a31e8cbd6db',
    set: data => set(data)
}))

const baseUrl = '/api/cart/'

function useCart() {
    const { set, cart, checkedItems, curProduct,
        quantity, productId, curPrice, image,
        userId, name, description, subTotal, extra } = store_()

    const getCarts = async () => {
        const res = await axios.get(`/api/cart/?userId=${userId}`)
        set({ cart: res.data })
    }

    const addCart = async () => {
        const body = { quantity, curPrice, productId, userId, name, description, image }
        console.log(body)
        const res = await axios.post('/api/cart', body)
        set(p => ({ cart: [...p?.cart, res.data] }))
    }

    const selectProduct = (product) => {
        set({
            curProduct: product, productId: product?._id,
            name: product?.title,
            curPrice: product?.extras?.[0]?.price || product?.prices?.[0],
            extra: product?.extras?.[0],
            description: product?.description,
            quantity: 1,
            image: product?.images?.[0]?.secure_url,
        })
        getCarts()
    }

    const deletePayItem = async (id) => {
        const res = await axios.delete(`/api/cart/?id=${id}`)
        if (res.data?.success) {
            set(p => ({ cart: p?.cart?.filter(x => x?._id != id) }))
        }
    }

    const incPayItemQnty = async (id) => {
        const res = await axios.put('/api/cart/?type=inc_qnty&id=' + id)
        set(p => ({
            cart: p?.cart?.map(x => x?._id == res.data?._id ? res.data : x)
        }))
    }

    const decPayItemQnty = async (id) => {
        const res = await axios.put('/api/cart/?type=dec_qnty&id=' + id)
        set(p => ({
            cart: p?.cart?.map(x => x?._id == res.data?._id ? res.data : x)
        }))
    }

    const getCurrentProduct = async (id) => {
        const res = await axios.get(`/api/products/` + id)
        selectProduct(res.data)
    }

    const incQuantity = () => set(p => ({ quantity: p.quantity + 1 }))
    const decQuantity = () => set(p => p.quantity <= 1 ? ({ quantity: 1 }) : ({ quantity: p.quantity - 1 }))

    const toCheckout = async () => {
        const res = await axios.post(`/api/transaction?userId=${userId}`)
        getCarts()
    }

    const selectItem = async (value, id) => {
        set({
            cart: cart.map(i => {
                if (i?._id == id) {
                    i.checked = !i.checked
                    return i
                }
                return i
            })
        })
        const res = await axios.put(baseUrl + `${id}?type=select&value=${value}`)
        set({ cart: cart.map(i => i?._id == res.data?._id ? res.data : i) })
    }

    return {
        set,
        quantity, cart, subTotal, checkedItems, curProduct, extra,
        curPrice,
        toCheckout, selectItem, getCurrentProduct,
        addCart, selectProduct, incQuantity, decQuantity,
        getCarts, deletePayItem, incPayItemQnty, decPayItemQnty,
        getSubTotal: () => getSubTotal_(set, cart),
        getTransactions: () => getTransactions_(cart)
    }
}

export default useCart


function getSubTotal_(set, cart) {
    const subTotal = 0
    cart?.map(item => {
        if (item?.checked) {
            subTotal += item?.total
        }
    })
    return subTotal
}


function getTransactions_(cart) {
    var ret = cart?.filter(p => p?.checked == true)
    if (ret?.length >= 1) return ret;
    return false;
}


