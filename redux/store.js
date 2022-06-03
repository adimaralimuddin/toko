const { configureStore } = require("@reduxjs/toolkit");
import cart from './cartSlice'
import product from './productSlice'

export default configureStore({
    reducer: {
        cart,
        product,
    }
});


