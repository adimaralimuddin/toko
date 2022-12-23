import create from "zustand";
import axios from "axios";

var url = "/api/products/";
const curl = `https://api.cloudinary.com/v1_1/dx8mmwiyp/image/upload`;


const store_ = create((set) => ({
  loading: true,
  products: [],
  updating: false,
  category: "all",
  maxPrice: 100000,
  minPrice: 0,
  onSale: false,
  ratings: 0,
  shipingFee: 6,
  originalPrice: 10,
  set: (data) => set(data),
}));

function useProduct() {
  const {
    loading,
    products,
    set,
    newProduct,
    updating,
    category,
    maxPrice,
    minPrice,
    ratings,
    shipingFee,
    originalPrice,
    onSale,
  } = store_();

  const queryData = (type = "query") => ({
    type,
    category,
    minPrice,
    maxPrice,
    ratings,
    shipingFee,
    originalPrice,
    onSale,
  });

  const getAllProducts = async (category) => {
    set({ products: [], loading: true });
    const { data } = await axios.post(
      url,
      category ? { ...queryData(), category } : queryData()
    );
    set({ products: data, loading: false });
    return data;
  };

  const getMainProduct = async () => {
    set({ products: [], loading: true });
    const { data } = await axios.post(url, { type: "all" });
    set({ products: data, loading: false });
  };

  const getProductsByCategory = async (category, limit) => {
    const { data } = await axios.post(url, {
      type: "category",
      category,
      limit,
    });
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
  };

  const updateProduct = async (store) => {
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
    loading,
    set,
    products,
    newProduct,
    updating,
    category,
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
