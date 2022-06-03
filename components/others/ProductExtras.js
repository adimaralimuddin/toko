import useCart from "../../controls/cartControl"

function ProductExtras() {
    const { curProduct, set, extra } = useCart()

    const onClickHandler = (val) => {
        console.log(val)
        set({ extra: val, curPrice: val?.price })
    }

    const isEqual = (val, a, b) => val?.text == extra?.text ? a : b

    return (
        <div className="my-2 flex flex-wrap">
            {
                curProduct?.extras?.map(
                    extra_ => (
                        <div
                            onClick={_ => onClickHandler(extra_)}
                            className={(isEqual(extra_, ' ring-orange-600 ring-2d '))
                                + " p-2 m-1 px-2 ring-1 ring-gray-200 cursor-pointer rounded-sm min-w-[60px] flex items-center justify-center"}>
                            <small>{extra_?.text}</small>
                        </div>
                    )
                )
            }</div>
    )
}

export default ProductExtras


