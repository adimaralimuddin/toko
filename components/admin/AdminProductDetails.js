

import Link from 'next/link'
import { useEffect, useState } from 'react'
import create from 'zustand'
import useProduct from '../../controls/productControls'

const store_ = create(set => ({ set: data => set(data) }))

function AdminProductDetails({ product }) {
    const store = store_()
    const { updateProduct, updating } = useProduct()
    // const [updating, setIsUpdating] = useState(false)

    useEffect(() => {
        store.set({ ...product, original: { ...product } })
    }, [])

    if (updating) {
        return <p>updating...</p>
    }

    // console.log(store);
    return (
        <div>
            <header>
                <Link href='/admin/add-product'>back</Link>
                <hr />
            </header>
            <main className='p-2 flex flex-col'>
                <span>
                    <label htmlFor="title">title</label>
                    <input value={store?.title} onChange={e => store.set({ title: e.target.value })} value={store?.title} type="text" />
                </span>
                <span>
                    <label htmlFor="description">description</label>
                    <input value={store?.description} onChange={e => store.set({ description: e.target.value })} value={store?.description} type="text" />
                </span>
                <Prices prices={store?.prices} set={store.set} curPrice={store?.curPrice} />

                <Images images={store?.img} />
            </main>
            <footer>
                <hr />
                <button onClick={_ => store.set(p => ({ ...p?.original }))}>Reset</button>
                <button onClick={_ => updateProduct(store)}>UPDATE</button>

            </footer>
        </div>
    )
}


function Prices({ prices, curPrice, set }) {
    return (
        <div>
            <div className='flex flex-wrap'>
                {
                    prices?.map(price =>
                        <div
                            onClick={_ => set(p => ({ prices: p.prices?.filter(p_ => p_ != price) }))}
                            className='p-1 m-1 bg-gray-200' key={price}>
                            {price}
                        </div>)
                }
            </div>
            <div>
                <button onClick={_ => set(p => ({ prices: [...p?.prices, p?.curPrice], curPrice: '' }))}>Add Price</button>
                <input value={curPrice} onChange={e => set({ curPrice: e.target?.value })} type="number" />
            </div>
        </div>
    )
}

function Images({ images }) {
    return (
        <div>
            {
                images?.map(image => (
                    <img src={image?.secure_url} width={200} />
                ))
            }
        </div>
    )
}

export default AdminProductDetails