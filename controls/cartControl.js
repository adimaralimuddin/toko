import axios from "axios";
import create from "zustand";

const store_ = create((set) => ({
  quantity: 1,
  loading: true,
  cart: [],
  paymentMethod: "online",
  set: (data) => set(data),
}));

const baseUrl = "/api/cart/";

function useCart() {
  const {
    set,
    loading,
    cart,
    checkedItems,
    curProduct,
    quantity,
    productId,
    curPrice,
    image,
    userId,
    name,
    description,
    subTotal,
    extra,
    paymentMethod,
    shipingFee,
  } = store_();

  const placeOrder = async (user, userId) => {
    const res = await axios.post("/api/checkout_sessions", {
      userId,
      paymentMethod,
      email: user?.email,
    });
    window.location.replace(res.data.url);
  };

  const getCarts = async () => {
    const res = await axios.get(baseUrl + `?userId=${userId}`);
    set({ cart: res.data });
  };

  const getSelectedCarts = async () => {
    set({ loading: true, checkedItems: [] });
    const res = await axios.get(baseUrl + `?userId=${userId}&type=select`);
    set({ checkedItems: res.data, loading: false });
  };

  const addCart = async (checked = false) => {
    const body = {
      quantity,
      userId,
      curPrice,
      productId,
      name,
      description,
      image,
      checked,
      shipingFee,
    };
    const res = await axios.post("/api/cart", body);
    set((p) => ({ cart: [...p?.cart, res.data] }));
  };

  const selectProduct = (product) => {
    set({
      loading: false,
      curProduct: product,
      productId: product?._id,
      name: product?.title,
      curPrice: product?.extras?.[0]?.price || product?.prices?.[0],
      extra: product?.extras?.[0],
      description: product?.description,
      quantity: 1,
      image: product?.images?.[0]?.secure_url,
      shipingFee: product?.shipingFee,
    });
    getCarts();
  };

  const deletePayItem = async (id) => {
    const res = await axios.delete(baseUrl + id);
    if (res.data?.success) {
      set((p) => ({ cart: p?.cart?.filter((x) => x?._id != id) }));
    }
  };

  const incPayItemQnty = async (id) => {
    const res = await axios.put(baseUrl + id, { type: "inc", userId });
    set((p) => ({
      cart: p?.cart?.map((x) => (x?._id == res.data?._id ? res.data : x)),
    }));
  };

  const decPayItemQnty = async (id) => {
    const res = await axios.put(baseUrl + id, { type: "dec", userId });
    set((p) => ({
      cart: p?.cart?.map((x) => (x?._id == res.data?._id ? res.data : x)),
    }));
  };

  const getCurrentProduct = async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/products/` + id);
      selectProduct(res.data);
    } catch (error) {
      set({ loading: false, curProduct: null });
    }
  };

  const incQuantity = () => set((p) => ({ quantity: p.quantity + 1 }));
  const decQuantity = () =>
    set((p) =>
      p.quantity <= 1 ? { quantity: 1 } : { quantity: p.quantity - 1 }
    );

  const selectItem = async (value, id) => {
    set({
      cart: cart.map((i) => {
        if (i?._id == id) {
          i.checked = !i.checked;
          return i;
        }
        return i;
      }),
    });
    const res = await axios.put(baseUrl + id, {
      type: "select",
      userId,
      value,
    });
    set({ cart: cart.map((i) => (i?._id == res.data?._id ? res.data : i)) });
  };

  const selectAllItems = async (value) => {
    const res = await axios.put(baseUrl, { userId, value });
    const newCart = cart.map((c) => {
      c.checked = value;
      return c;
    });
    set({ cart: newCart });
  };

  return {
    set,
    userId,
    loading,
    quantity,
    cart,
    subTotal,
    checkedItems,
    curProduct,
    extra,
    curPrice,
    paymentMethod,
    placeOrder,
    selectItem,
    getCurrentProduct,
    addCart,
    selectProduct,
    selectAllItems,
    incQuantity,
    decQuantity,
    getCarts,
    getSelectedCarts,
    deletePayItem,
    incPayItemQnty,
    decPayItemQnty,
    getSubTotal: () => getSubTotal_(set, cart),
    getTransactions: () => getTransactions_(cart),
  };
}

export default useCart;

function getSubTotal_(set, cart) {
  const subTotal = 0;
  cart?.map((item) => {
    if (item?.checked) {
      subTotal += item?.total;
    }
  });
  return subTotal;
}

function getTransactions_(cart) {
  var ret = cart?.filter((p) => p?.checked == true);
  if (ret?.length >= 1) return ret;
  return false;
}
