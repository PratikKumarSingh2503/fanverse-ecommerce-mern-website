import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Sets the product list
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    // Adds an item to the cart
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Item already in cart");
      } else {
        toast("Item added to cart");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    // Deletes an item from the cart
    deleteCartItem: (state, action) => {
      toast("Item removed from cart");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1); // Removes item from cart
    },
    // Increases the quantity of an item in the cart
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index >= 0 && state.cartItem[index].qty < 20) {
        const item = state.cartItem[index];
        item.qty += 1;
        item.total = item.price * item.qty; // Updates total price
      } else {
        toast("Maximum quantity is 20");
      }
    },
    // Decreases the quantity of an item in the cart
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index >= 0 && state.cartItem[index].qty > 1) {
        const item = state.cartItem[index];
        item.qty -= 1;
        item.total = item.price * item.qty; // Updates total price
      } else {
        toast("Minimum quantity is 1");
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
