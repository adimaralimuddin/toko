import create from "zustand";
import axios from "axios";

var url = "/api/products/";
const curl = `https://api.cloudinary.com/v1_1/dx8mmwiyp/image/upload`;

const store_ = create((set) => ({
  products: [],
  updating: false,
  category: "all",
  subCategory: "all",
  maxPrice: 100000,
  minPrice: 0,
  onSale: false,
  ratings: -1,
  stock: -1,
  sold: -1,
  shipingFee: -1,
  originalPrice: -1,
  set: (data) => set(data),
}));
// const productsStore = create(set => ({

// }))

function useProduct() {
  const {
    products,
    set,
    newProduct,
    updating,
    category,
    subCategory,
    maxPrice,
    minPrice,
    stock,
    sold,
    ratings,
    shipingFee,
    originalPrice,
    onSale,
  } = store_();

  const getAllProducts = async (category_ = category) => {
    set({ products: [] });
    console.log("getAllProducts");
    const query = `?category=${category_}&subCategory=${subCategory}&maxPrice=${maxPrice}&minPrice=${minPrice}&ratings=${ratings}&stock=${stock}&sold=${sold}&shipingFee=${shipingFee}&originalPrice=${originalPrice}`;
    console.log(query);
    const { data } = await axios.get(url + query);
    set({ products: data });
    return data;
  };

  const getMainProduct = async () => {
    // set({ category: 'all', subCategory: '', minPrice: 0, maxPrice: 100000, stock: -1, ratings: -1, sold: -1, shipingFee: -1, originalPrice: -1 })
    // getAllProducts()
    const { data } = await axios.get(url + `?type=all`);
    console.log(data);
    set({ products: data });
  };

  const getProductsByCategory = async (category, limit = true) => {
    const { data } = await axios.get(
      url + `?type=category&category=${category}&limit=${limit}`
    );
    return data;
  };

  const deleteById = async (id) => {
    const res = await axios.delete(url + "/" + id);
    console.log("res: ", res);
    set({ products: products?.filter((p) => p?._id != id) });
  };

  const addProduct = async (store) => {
    console.log(store);
    const images = await Promise.all(
      store.imgFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ic1gwejh");

        const {
          data: { secure_url, public_id },
        } = await axios.post(curl, formData);
        return { secure_url, public_id };
      })
    );
    console.log(images);

    const res = await axios.post("/api/products", {
      ...store.values,
      images,
    });

    set((p) => ({
      products: [...p?.products, res.data],
      newProduct: res.data,
    }));
    // store.set({ title: '', description: '', prices: [], img: [], imgFiles: [] })
  };

  const updateProduct = async (store) => {
    // console.log(store)
    set({ updating: true });
    const { data } = await axios.put(url + store?._id, {
      title: store?.title,
      description: store?.description,
      img: store?.img,
      prices: store?.prices,
    });
    set((p) => ({
      products: p?.products?.map((p) => {
        if (p?._id != data?._id) return p;
        return data;
      }),
    }));
    set({ updating: false });
  };

  return {
    set,
    products,
    newProduct,
    updating,
    category,
    subCategory,
    minPrice,
    maxPrice,
    ratings,
    shipingFee,
    originalPrice,
    onSale,
    getAllProducts,
    getMainProduct,
    deleteById,
    addProduct,
    updateProduct,
    getProductsByCategory,
  };
}

export default useProduct;
