import useCart from "../../controls/cartControl";

function ProductExtras() {
  const { curProduct, set, extra } = useCart();

  const onClickHandler = (val) => {
    set({ extra: val, curPrice: val?.price });
  };

  const isEqual = (val, a, b) => (val?.text == extra?.text ? a : b);

  return (
    <div className="my-2 flex flex-wrap">
      {curProduct?.extras?.map((extra_) => (
        <div
          key={extra_?.text}
          onClick={(_) => onClickHandler(extra_)}
          className={
            isEqual(extra_, " ring-green-400 ring-[2px] text-green-500  ") +
            " hover:ring-green-400 hover:text-green-500 p-2 m-1 px-2 ring-1 ring-slate-200 text-slate-500 cursor-pointer rounded-lg min-w-[60px] flex items-center justify-center"
          }
        >
          <small>{extra_?.text}</small>
        </div>
      ))}
    </div>
  );
}

export default ProductExtras;
