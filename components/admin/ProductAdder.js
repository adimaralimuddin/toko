import Select_ from "../elements/Select";
import Link from "next/link";
import { useEffect } from "react";
import create from "zustand";
import useProduct from "../../controls/productControls";
import { toDataUrl } from "../../utils/tools";
import Dist from "../elements/Dist";
import Input_ from "../elements/Input_";
import PrimaryButton from "../elements/PrimaryButton";

const store_ = create((set, get) => ({
  title: "",
  description: "",
  ratings: 4.5,
  originalPrice: 20,
  stock: 1403,
  sold: 460,
  onSale: false,
  shipingFee: 5,
  prices: [],
  products: [],
  images: [],
  extras: [],
  set: (data) => set(data),
}));

function ProductAdder() {
  const store = store_();

  const { newProduct, getAllProducts, addProduct, deleteById } = useProduct();

  useEffect(() => {
    getAllProducts();
  }, []);

  const addImage = async ({ target }) => {
    store.set({ imgFiles: [...target.files] });
    const images = await Promise.all([...target.files].map(toDataUrl));
    store.set((p) => ({ images }));
  };

  const onAddHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const values = {
      ...Object.fromEntries(data.entries()),
      prices: store?.prices,
      extras: store?.extras,
    };
    await addProduct({ values, imgFiles: store?.imgFiles });
    form.title.value = "";
    form.description.value = "";
    form.stock.value = "";
    form.category.value = "";
    form.subCategory.value = "";
    form.originalPrice.value = "";
    store.set({ prices: [], images: [], imgFiles: [], extras: [] });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={onAddHandler} className="flex flex-col p-2 bg-white m-2">
        <h3>ADD PRODUCT</h3>
        <Input_
          name="title"
          value={store?.title}
          label="Title"
          onChange={(e) => store.set({ title: e.target?.value })}
          className="flex-1d m-1"
          required
        />
        <Input_
          name="description"
          value={store?.description}
          label="Description"
          onChange={(e) => store.set({ description: e.target?.value })}
          className="flex-1d m-1"
          // required
        />
        <div className="flex flex-wrap">
          <Input_
            name="originalPrice"
            value={store?.originalPrice}
            label="Orig Price"
            type="number"
            onChange={(e) => store.set({ originalPrice: e.target?.value })}
            className="flex-1d m-1 w-[80px]"
            required
          />
          <Input_
            name="stock"
            value={store?.stock}
            label="Stock"
            type="number"
            onChange={(e) => store.set({ stock: e.target?.value })}
            className="flex-1d m-1 w-[80px]"
            required
          />
          <Input_
            name="category"
            value={store?.category}
            label="Category"
            type="text"
            onChange={(e) => store.set({ category: e.target?.value })}
            className="flex-1 m-1 "
            required
          />
          <Input_
            name="subCategory"
            value={store?.subCategory}
            label="Sub category"
            type="text"
            onChange={(e) => store.set({ subCategory: e.target?.value })}
            className="flex-1 m-1 "
          />
          <Input_
            name="details"
            value={store?.details}
            label="Details"
            type="text"
            onChange={(e) => store.set({ details: e.target?.value })}
            className="flex-1 m-1 "
          />
        </div>
        <div className="flex flex-wrap">
          <Input_
            name="ratings"
            value={store?.ratings}
            label="Ratings"
            type="number"
            onChange={(e) => store.set({ ratings: e.target?.value })}
            className="flex-1 m-1 min-w-[100px]"
          />
          <Input_
            name="sold"
            value={store?.sold}
            label="Sold"
            type="number"
            onChange={(e) => store.set({ sold: e.target?.value })}
            className="flex-1 m-1 min-w-[100px]"
          />
          <Input_
            name="shipingFee"
            value={store?.shipingFee}
            label="Shiping fee"
            type="number"
            onChange={(e) => store.set({ shipingFee: e.target?.value })}
            className="flex-1 m-1 min-w-[100px] "
          />
          <Select_ name="onSale" label="On Sale" values={[false, true]} />
          <Select_
            name="freeShiping"
            label="Free Ship"
            values={[false, true]}
          />
        </div>
        <PrimaryButton type="submit">add</PrimaryButton>
      </form>

      <section>
        <div className="p-2">
          <div className="flex flex-wrap">
            {store?.images?.map((img) => (
              <img
                className="ring-1 mr-2 mb-2"
                width={100}
                src={img}
                key={img}
              />
            ))}
          </div>
          <input onInput={addImage} type="file" multiple />
        </div>
        <PriceAdder store={store} />
        <ExtraAdder store={store} />
      </section>
      <ProductAdminItem product={newProduct} deleteById={deleteById} />
    </div>
  );
}

function ProductAdminItem({ product, deleteById }) {
  console.log(product);
  return (
    <Link href={`/products/${product?._id}`}>
      <div className="flex flex-col bg-gray-200 p-2 m-2 w-[200px] cursor-pointer">
        <Dist>
          <small className="font-semibold">{product?.title}</small>
        </Dist>
        <small>{product?.description}</small>
        <div className="flex flex-wrap flex-1">
          {product?.images?.map((img) => (
            <img
              className="mr-1 ring-1"
              width={40}
              src={img.secure_url}
              key={img?.secure_url}
            />
          ))}
        </div>
        <span className="flex justify-between">
          <small>
            cat: <Dist>{product?.category}</Dist>
          </small>
          <small>
            subCat: <Dist>{product?.subCategory}</Dist>
          </small>
        </span>
        <span className="flex items-center mb-1">
          <small>Prices:</small>
          <div className="flex items-center">
            {product?.prices?.map((price) => (
              <p key={price} className="px-1 ml-1 bg-gray-300 rounded-md">
                {price}
              </p>
            ))}
          </div>
          <Dist>{product?.originalPrice}</Dist>
        </span>
        <span className="flex flex-wrap ">
          {product?.extras?.map((extra) => (
            <div key={extra?.text} className="flex flex-col ring-1 p-1">
              <small>{extra?.text}</small>
              <small>${extra?.price}</small>
            </div>
          ))}
        </span>
        <span className="flex justify-between">
          <small>stock: {product?.stock}</small>
          <small>ratinges: {product?.ratings}</small>
        </span>
        <footer>
          <PrimaryButton onClick={() => deleteById(product?._id)}>
            delete
          </PrimaryButton>
          <Link href={`/admin/products/${product?._id}`}>
            <PrimaryButton>modify</PrimaryButton>
          </Link>
        </footer>
      </div>
    </Link>
  );
}

function ExtraAdder({ store }) {
  const addExtraHandler = () => {
    if (store.text == "" || store.extraPrice == "") return;
    store.set((p) => ({
      extras: [...p.extras, { text: p.text, price: p.extraPrice }],
    }));
  };

  return (
    <div className="flex flex-col">
      <span className="flex flex-wrap">
        {store?.extras?.map((extra) => (
          <div
            key={extra?.text}
            onClick={(_) =>
              store.set((p) => ({ extras: p.extras.filter((p) => p != extra) }))
            }
            className="flex flex-col p-1 mx-1 rounded-md bg-gray-200"
          >
            <small>{extra?.text}</small>
            <small>{extra?.price}</small>
          </div>
        ))}
      </span>
      <span className="flex flex-wrap">
        <PrimaryButton onClick={addExtraHandler}>Add Extra</PrimaryButton>
        <Input_
          name="text"
          value={store.text}
          label="text"
          type="text"
          onChange={(e) => store.set({ text: e.target.value })}
          className="flex-1 mx-1"
        />
        <Input_
          name="extraPrice"
          value={store.extraPrice}
          label="extra price"
          type="number"
          onChange={(e) => store.set({ extraPrice: e.target.value })}
          className=" w-[110px]"
        />
      </span>
    </div>
  );
}

function PriceAdder({ store }) {
  return (
    <div className="flex items-end">
      <Input_
        label="price"
        value={store?.price}
        type="number"
        onChange={(e) => store.set({ price: e.target?.value })}
        className="flex-1 m-1 w-[100px] "
      />
      <span>
        <h3>Prices</h3>
        <div className="flex flex-wrap">
          {store?.prices?.map((price) => (
            <p
              key={price}
              onClick={(_) =>
                store.set((p) => ({
                  prices: p.prices.filter((p) => p != price),
                }))
              }
              className=" p-1 px-2 m-1 text-sm rounded-md bg-gray-200"
            >
              {price}
            </p>
          ))}
        </div>
      </span>
      <button
        onClick={(_) => store.set((p) => ({ prices: [...p.prices, p.price] }))}
        className="px-2 py-1 rounded-md bg-purple-500 mx-1 text-white"
      >
        Add
      </button>
    </div>
  );
}

export default ProductAdder;
